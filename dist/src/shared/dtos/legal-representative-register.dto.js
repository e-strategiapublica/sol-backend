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
exports.LegalRepresentativeRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const marital_status_enum_1 = require("../../modules/SOL/enums/marital-status.enum");
const address_register_dto_1 = require("./address-register.dto");
class LegalRepresentativeRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], LegalRepresentativeRegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], LegalRepresentativeRegisterDto.prototype, "nationality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: marital_status_enum_1.MaritalStatusEnum, required: true }),
    __metadata("design:type", String)
], LegalRepresentativeRegisterDto.prototype, "maritalStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], LegalRepresentativeRegisterDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], LegalRepresentativeRegisterDto.prototype, "rg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], LegalRepresentativeRegisterDto.prototype, "document_origin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, required: true }),
    __metadata("design:type", Date)
], LegalRepresentativeRegisterDto.prototype, "validityData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: address_register_dto_1.AddressRegisterDto }),
    __metadata("design:type", address_register_dto_1.AddressRegisterDto)
], LegalRepresentativeRegisterDto.prototype, "address", void 0);
exports.LegalRepresentativeRegisterDto = LegalRepresentativeRegisterDto;
//# sourceMappingURL=legal-representative-register.dto.js.map