"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateValidator = void 0;
const common_1 = require("@nestjs/common");
const validators_util_1 = require("../../../shared/utils/validators.util");
let AuthenticateValidator = class AuthenticateValidator {
    validate(dto) {
        const validator = new validators_util_1.ValidatorsUtil();
        validator.isRequired(dto.email, 'Email é obrigatório!');
        validator.isEmail(dto.email, 'Email é inválido!');
        validator.isRequired(dto.password, 'Senha é obrigatória!');
        validator.hasMinLen(dto.password, 8, 'Senha deve ter no mínimo 8 caracteres!');
        validator.hasMaxLen(dto.password, 20, 'Senha deve ter no máximo 20 caracteres!');
        this.errors = validator.errors;
        return validator.isValid();
    }
};
AuthenticateValidator = __decorate([
    (0, common_1.Injectable)()
], AuthenticateValidator);
exports.AuthenticateValidator = AuthenticateValidator;
//# sourceMappingURL=authenticate.validator.js.map