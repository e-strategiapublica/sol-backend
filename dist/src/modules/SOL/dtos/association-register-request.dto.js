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
exports.AssociationRegisterRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const address_register_dto_1 = require("../../../shared/dtos/address-register.dto");
const legal_representative_register_dto_1 = require("../../../shared/dtos/legal-representative-register.dto");
class AssociationRegisterRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], AssociationRegisterRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], AssociationRegisterRequestDto.prototype, "cnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: address_register_dto_1.AddressRegisterDto }),
    __metadata("design:type", address_register_dto_1.AddressRegisterDto)
], AssociationRegisterRequestDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: legal_representative_register_dto_1.LegalRepresentativeRegisterDto }),
    __metadata("design:type", legal_representative_register_dto_1.LegalRepresentativeRegisterDto)
], AssociationRegisterRequestDto.prototype, "legalRepresentative", void 0);
exports.AssociationRegisterRequestDto = AssociationRegisterRequestDto;
//# sourceMappingURL=association-register-request.dto.js.map