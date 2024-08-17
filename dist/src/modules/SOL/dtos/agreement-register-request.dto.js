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
exports.AgreementRegisterRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const agreement_status_enum_1 = require("../enums/agreement-status.enum");
class AgreementRegisterRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "register_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "register_object", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: Object.keys(agreement_status_enum_1.AgreementStatusEnum) }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "states", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number }),
    __metadata("design:type", Number)
], AgreementRegisterRequestDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Date }),
    __metadata("design:type", Date)
], AgreementRegisterRequestDto.prototype, "signature_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Date }),
    __metadata("design:type", Date)
], AgreementRegisterRequestDto.prototype, "validity_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "associationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "reviewer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: String }),
    __metadata("design:type", String)
], AgreementRegisterRequestDto.prototype, "manager", void 0);
exports.AgreementRegisterRequestDto = AgreementRegisterRequestDto;
//# sourceMappingURL=agreement-register-request.dto.js.map