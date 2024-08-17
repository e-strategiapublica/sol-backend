import { HttpException, HttpStatus } from '@nestjs/common';
export declare class ErrorManager extends HttpException {
    constructor(statusCode: HttpStatus, message: string, code: number);
    static createError(error: any): void;
}
