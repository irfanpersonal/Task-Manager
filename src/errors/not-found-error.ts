import CustomError from './custom-error';
import {StatusCodes} from 'http-status-codes';

interface INotFoundError {
    statusCode: number
}

class NotFoundError extends CustomError implements INotFoundError {
    public statusCode: number = StatusCodes.NOT_FOUND;
    constructor(message: string) {
        super(message);
    }
}

export default NotFoundError;