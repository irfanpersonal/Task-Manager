import CustomError from './custom-error';
import {StatusCodes} from 'http-status-codes';

interface IUnauthorizedError {
    statusCode: number
}

class UnauthorizedError extends CustomError implements IUnauthorizedError {
    public statusCode: number = StatusCodes.UNAUTHORIZED;
    constructor(message: string) {
        super(message);
    }
}

export default UnauthorizedError;