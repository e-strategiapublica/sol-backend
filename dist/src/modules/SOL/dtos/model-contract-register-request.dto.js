"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelContractRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const model_contract_status_enum_1 = require("../enums/model-contract-status.enum");
const language_contract_enum_1 = require("../enums/language-contract.enum");
const modelContract_classification_enum_1 = require("../enums/modelContract-classification.enum");
class ModelContractRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ModelContractRegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: model_contract_status_enum_1.ModelContractStatusEnum }),
    __metadata("design:type", String)
], ModelContractRegisterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: modelContract_classification_enum_1.ModelContractClassificationEnum }),
    __metadata("design:type", String)
], ModelContractRegisterDto.prototype, "classification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ModelContractRegisterDto.prototype, "contract", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: language_contract_enum_1.LanguageContractEnum }),
    __metadata("design:type", String)
], ModelContractRegisterDto.prototype, "language", void 0);
exports.ModelContractRegisterDto = ModelContractRegisterDto;
//# sourceMappingURL=model-contract-register-request.dto.js.map