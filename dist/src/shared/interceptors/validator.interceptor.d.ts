import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidatorContractInterface } from '../interfaces/validator-contract.interface';
export declare class ValidatorInterceptor implements NestInterceptor {
    validationContractInterface: ValidatorContractInterface;
    constructor(validationContractInterface: ValidatorContractInterface);
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>>;
}
