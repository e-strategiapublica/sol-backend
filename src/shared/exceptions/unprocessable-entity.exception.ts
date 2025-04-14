import { HttpStatus } from "@nestjs/common";
import { CustomHttpException } from "./custom-http.exception";
import { ValidationError } from "class-validator";

export class UnprocessableEntityException extends CustomHttpException {
  constructor(errors: ValidationError[]) {
    const errorsMessage = errors.flatMap(
      (error) => Object.values(error.constraints || {}) as string[],
    );
    super(errorsMessage, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
