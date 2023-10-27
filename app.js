require('dotenv').config();
require('express-async-errors');
const connectDB = require('./database/connect.js');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const authRouter = require('./routers/auth.js');
const tasksRouter = require('./routers/tasks.js');
const authenticationMiddleware = require('./middleware/authentication.js');
const express = require('express');
const app = express();

const path = require('node:path');
const { StatusCodes } = require('http-status-codes');

app.use(express.json());

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/tasks', authenticationMiddleware, tasksRouter);

app.get('*', (req, res) => {
    return res.status(StatusCodes.OK).sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    }
    catch(error) {
        console.log(error);
    }
}

start();