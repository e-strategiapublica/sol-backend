"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const response_dto_1 = require("../dtos/response.dto");
class ValidatorInterceptor {
    constructor(validationContractInterface) {
        this.validationContractInterface = validationContractInterface;
    }
    intercept(context, next) {
        const body = context.switchToHttp().getRequest().body;
        const valid = this.validationContractInterface.validate(body);
        if (!valid)
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, this.validationContractInterface.errors), common_1.HttpStatus.BAD_REQUEST);
        return next.handle();
    }
}
exports.ValidatorInterceptor = ValidatorInterceptor;
//# sourceMappingURL=validator.interceptor.js.map