/**
 * @deprecated This class is deprecated. Use interface ResponseDTO .
 * @use ResponseDTOV2
 */
export class ResponseDto {
  constructor(
    public success: boolean,
    public data: any,
    public errors: any,
  ) {}
}

export interface ResponseDtoV2<T> {
  success: boolean;
  data: T;
  errors?: string[];
}
