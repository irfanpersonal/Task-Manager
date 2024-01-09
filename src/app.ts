import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import express, {Express} from 'express';
import connectDB from './database/connect';
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authRouter from './routers/auth';
import userRouter from './routers/user';
import authenticationMiddleware from './middleware/authentication';
import taskRouter from './routers/task';
const app: Express = express();

import path from 'node:path';

app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.json());

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/user', authenticationMiddleware, userRouter);

app.use('/api/v1/task', authenticationMiddleware, taskRouter);

app.get('*', (req, res) => {
	return res.status(200).sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port: number = Number(process.env.PORT) || 4000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI as string);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }
    catch(error) {
        console.log(error);
    }
}

start();