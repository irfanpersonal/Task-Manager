import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    comparePassword: (guess: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Must Provide User Name'],
        minLength: 3,
        maxLength: 12,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Must Provide User Email'],
        validate: {
            validator: (value: string) => {
                return validator.isEmail(value);
            },
            msg: 'Invalid Email Address'
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Must Provide User Password'],
        minLength: 6
    }
}, {timestamps: true});

userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const randomBytes = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, randomBytes);
});

userSchema.post('deleteOne', {document: true, query: false}, async function() {
    await this.model('Task').deleteMany({user: this._id});
});

userSchema.methods.comparePassword = async function(guess: string) {
    const isCorrect = await bcrypt.compare(guess, this.password);
    return isCorrect;
}   

export default mongoose.model<IUser>('User', userSchema);