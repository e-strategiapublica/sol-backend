import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseDtoV2 } from "../dtos/response.dto";
import { BackendErrors, BackendErrorsInfo } from "../enums/errors";

/**
 * Custom HTTP V2 exception class for standardized error handling in the backend.
 * 1.Criar o enum e informações do erro em shared/enums/errors.ts.
 * @param error -Enum do erro, enum `BackendErrors`.
 * @param data - O payload definido na tipagem: `BackendErrorsInfo`.
 *
 * @example
 * throw new CustomHttpExceptionV2(BackendErrors.INVALID_TOKEN, { reason: 'Token expired' });
 */
export class CustomHttpExceptionV2<
  T extends BackendErrors,
> extends HttpException {
  constructor(error: T, data: ErrorPayload<T>) {
    const info = BackendErrorsInfo[error];
    super(data, info.code);
  }
}

type ErrorPayload<T extends BackendErrors> = {
  [K in (typeof BackendErrorsInfo)[T]["data"][number]]: string | number;
};

/**
 * @deprecated Use `CustomHttpExceptionV2` instead.
 */
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
