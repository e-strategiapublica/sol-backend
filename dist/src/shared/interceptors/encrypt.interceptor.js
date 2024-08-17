"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptInterceptor = void 0;
const common_1 = require("@nestjs/common");
const response_dto_1 = require("../dtos/response.dto");
const crypto_util_1 = require("../utils/crypto.util");
class EncryptInterceptor {
    intercept(context, next) {
        const payloadKey = process.env.ENCRYPT_KEY;
        const payload = context.switchToHttp().getRequest().body.payload;
        if (!payload)
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, ['payload is mandatory!']), common_1.HttpStatus.BAD_REQUEST);
        const decryptedBody = JSON.parse(crypto_util_1.default.decrypt(payloadKey, context.switchToHttp().getRequest().body.payload));
        if (!decryptedBody)
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, ['error trying to decrypt the payload!']), common_1.HttpStatus.BAD_REQUEST);
        context.switchToHttp().getRequest().body = decryptedBody;
        return next.handle();
    }
}
exports.EncryptInterceptor = EncryptInterceptor;
//# sourceMappingURL=encrypt.interceptor.js.map