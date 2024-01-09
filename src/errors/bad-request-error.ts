import CustomError from './custom-error';
import {StatusCodes} from 'http-status-codes';

interface IBadRequestError {
    statusCode: number
}

class BadRequestError extends CustomError implements IBadRequestError {
    public statusCode: number = StatusCodes.BAD_REQUEST
    constructor(message: string) {
        super(message);
    }
}

export default BadRequestError;