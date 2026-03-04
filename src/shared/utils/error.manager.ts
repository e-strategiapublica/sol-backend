import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorManager extends HttpException {
  constructor(statusCode: HttpStatus, message: string, code: number) {
    super({ message, code }, statusCode);
  }

  public static createError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const stack = error?.stack || new Error().stack;

    const wrappedError = new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    wrappedError.stack = stack;

    throw wrappedError;
  }
}
