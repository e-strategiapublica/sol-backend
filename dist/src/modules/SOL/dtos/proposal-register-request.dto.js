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
exports.ProposalRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const proposal_status_enum_1 = require("../enums/proposal-status.enum");
class ProposalRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ProposalRegisterDto.prototype, "total_value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], ProposalRegisterDto.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: proposal_status_enum_1.ProposalStatusEnum, default: proposal_status_enum_1.ProposalStatusEnum.aguardando1 }),
    __metadata("design:type", String)
], ProposalRegisterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    __metadata("design:type", Array)
], ProposalRegisterDto.prototype, "item_list", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ProposalRegisterDto.prototype, "licitacaoId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ProposalRegisterDto.prototype, "proposedById", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], ProposalRegisterDto.prototype, "allotmentIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], ProposalRegisterDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], ProposalRegisterDto.prototype, "association_accept", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], ProposalRegisterDto.prototype, "supplier_accept", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    __metadata("design:type", Number)
], ProposalRegisterDto.prototype, "freight", void 0);
exports.ProposalRegisterDto = ProposalRegisterDto;
//# sourceMappingURL=proposal-register-request.dto.js.map