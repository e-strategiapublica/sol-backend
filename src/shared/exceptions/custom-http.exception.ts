import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseDtoV2 } from "../dtos/response.dto";

export class CustomHttpException extends HttpException {
  constructor(
    errors: string | string[],
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    const normalizedErrors: string[] = Array.isArray(errors)
      ? errors
      : [errors];
    const response: ResponseDtoV2<null> = {
      success: false,
      data: null,
      errors: normalizedErrors,
    };

    super(response, status);
  }
}
