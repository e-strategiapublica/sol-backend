"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorManager = void 0;
const common_1 = require("@nestjs/common");
class ErrorManager extends common_1.HttpException {
    constructor(statusCode, message, code) {
        super({ message, code }, statusCode);
    }
    static createError(error) {
        if (error.response) {
            throw new common_1.HttpException(error.response, error.status);
        }
        else {
            throw new common_1.HttpException("Internal server error", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.ErrorManager = ErrorManager;
//# sourceMappingURL=error.manager.js.map