import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { ResponseDto } from "../dtos/response.dto";

export class EncryptInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Agora aceita o corpo da requisição diretamente, sem descriptografia
    return next.handle();
  }
}
