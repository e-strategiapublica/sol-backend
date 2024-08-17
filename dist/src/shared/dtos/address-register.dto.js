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
exports.AddressRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AddressRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "zipCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "publicPlace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "complement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "referencePoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    __metadata("design:type", String)
], AddressRegisterDto.prototype, "number", void 0);
exports.AddressRegisterDto = AddressRegisterDto;
//# sourceMappingURL=address-register.dto.js.map