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
exports.ProjectRegisterRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const legal_representative_register_dto_1 = require("../../../shared/dtos/legal-representative-register.dto");
const legal_representative_schema_1 = require("../../../shared/schemas/legal-representative.schema");
class ProjectRegisterRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], ProjectRegisterRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], ProjectRegisterRequestDto.prototype, "project_manager", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    __metadata("design:type", Array)
], ProjectRegisterRequestDto.prototype, "agreement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Array }),
    __metadata("design:type", Array)
], ProjectRegisterRequestDto.prototype, "agreement_list", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: legal_representative_register_dto_1.LegalRepresentativeRegisterDto }),
    __metadata("design:type", legal_representative_schema_1.LegalRepresentative)
], ProjectRegisterRequestDto.prototype, "legal_representative", void 0);
exports.ProjectRegisterRequestDto = ProjectRegisterRequestDto;
//# sourceMappingURL=project-register-request.dto.js.map