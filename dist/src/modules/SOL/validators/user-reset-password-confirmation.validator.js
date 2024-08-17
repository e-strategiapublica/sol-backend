"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResetPasswordConfirmationValidator = void 0;
const common_1 = require("@nestjs/common");
const validators_util_1 = require("../../../shared/utils/validators.util");
let UserResetPasswordConfirmationValidator = class UserResetPasswordConfirmationValidator {
    validate(dto) {
        const validator = new validators_util_1.ValidatorsUtil();
        validator.isRequired(dto.email, 'Email é obrigatório!');
        validator.isEmail(dto.email, 'Email inválido!');
        validator.isRequired(dto.newPassword, 'Senha é obrigatória!');
        validator.hasMinLen(dto.newPassword, 8, 'Senha deve conter no mínimo 8 caracteres!');
        validator.hasMaxLen(dto.newPassword, 20, 'Senha deve conter no máximo 20 caracteres!');
        validator.isRequired(dto.code, 'Código é obrigatório!!');
        validator.hasExactlyTheNumberOfDigits(5, dto.code, 'Código deve conter 5 números!');
        this.errors = validator.errors;
        return validator.isValid();
    }
};
UserResetPasswordConfirmationValidator = __decorate([
    (0, common_1.Injectable)()
], UserResetPasswordConfirmationValidator);
exports.UserResetPasswordConfirmationValidator = UserResetPasswordConfirmationValidator;
//# sourceMappingURL=user-reset-password-confirmation.validator.js.map