require('dotenv').config();
const connectDB = require('./database/connect.js');
// const data = require('./MOCK_DATA.json'); // LOAD DATA HERE
const Task = require('./models/Task.js');

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Task.create(data);
        console.log('DONE!');
        process.exit(0);
    }
    catch(error) {
        console.log(error);
        process.exit(1);
    }
}

start();