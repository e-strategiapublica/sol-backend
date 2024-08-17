"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TfaVerifyValidator = void 0;
const common_1 = require("@nestjs/common");
const validators_util_1 = require("../../../shared/utils/validators.util");
let TfaVerifyValidator = class TfaVerifyValidator {
    validate(dto) {
        const validator = new validators_util_1.ValidatorsUtil();
        validator.isRequired(dto.secret, 'secret is required!');
        validator.isRequired(dto.code, 'code is required!');
        validator.isSixDigitNumber(dto.code, 'code must be a number with 6 positions!');
        this.errors = validator.errors;
        return validator.isValid();
    }
};
TfaVerifyValidator = __decorate([
    (0, common_1.Injectable)()
], TfaVerifyValidator);
exports.TfaVerifyValidator = TfaVerifyValidator;
//# sourceMappingURL=tfa-verify.validator.js.map