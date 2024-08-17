"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterValidator = void 0;
const common_1 = require("@nestjs/common");
const validators_util_1 = require("../../../shared/utils/validators.util");
const user_type_enum_1 = require("../enums/user-type.enum");
let UserRegisterValidator = class UserRegisterValidator {
    validate(dto) {
        const validator = new validators_util_1.ValidatorsUtil();
        validator.isRequired(dto.email, 'Email é obrigatório!');
        validator.isEmail(dto.email, 'Email inválido!');
        validator.isRequired(dto.name, 'Nome é obrigatório!');
        validator.isRequired(dto.type, 'Tipo é obrigatório!');
        if (dto.type == user_type_enum_1.UserTypeEnum.administrador) {
            validator.isRequired(dto.roles, 'Função é obrigatória!');
        }
        if (dto.type == user_type_enum_1.UserTypeEnum.associacao) {
            validator.isRequired(dto.phone, 'Telefone é obrigatório!');
            validator.isRequired(dto.document, 'CPF/CNPJ é obrigatório!');
            validator.isRequired(dto.association, 'Associação é obrigatório!');
        }
        if (dto.type == user_type_enum_1.UserTypeEnum.fornecedor) {
            validator.isRequired(dto.type, 'Telefone é obrigatório!');
            validator.isRequired(dto.document, 'CPF é obrigatório!');
            validator.isRequired(dto.supplier, 'Fornecedor é obrigatório!');
        }
        this.errors = validator.errors;
        return validator.isValid();
    }
};
UserRegisterValidator = __decorate([
    (0, common_1.Injectable)()
], UserRegisterValidator);
exports.UserRegisterValidator = UserRegisterValidator;
//# sourceMappingURL=user-register.validator.js.map