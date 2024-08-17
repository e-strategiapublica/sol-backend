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
exports.BideRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const bid_type_enum_1 = require("../enums/bid-type.enum");
const bid_modality_enum_1 = require("../enums/bid-modality.enum");
const allotment_request_dto_1 = require("./allotment-request.dto");
const bid_status_enum_1 = require("../enums/bid-status.enum");
class BideRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "bid_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "agreementId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "classification", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "start_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "end_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "days_to_delivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "days_to_tiebreaker", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "local_to_delivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: bid_status_enum_1.BidStatusEnum }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: bid_type_enum_1.BidTypeEnum }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "bid_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: bid_modality_enum_1.BidModalityEnum }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "modality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "aditional_site", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [allotment_request_dto_1.AllotmentRequestDto] }),
    __metadata("design:type", Array)
], BideRegisterDto.prototype, "add_allotment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Array }),
    __metadata("design:type", Array)
], BideRegisterDto.prototype, "invited_suppliers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "editalFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "ataFile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], BideRegisterDto.prototype, "city", void 0);
exports.BideRegisterDto = BideRegisterDto;
//# sourceMappingURL=bid-register-request.dto.js.map