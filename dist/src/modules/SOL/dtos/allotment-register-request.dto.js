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
exports.AllotmentRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const proposal_register_request_dto_1 = require("./proposal-register-request.dto");
const item_register_request_dto_1 = require("./item-register-request.dto");
const allotment_status_enum_1 = require("../enums/allotment-status.enum");
class AllotmentRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], AllotmentRegisterDto.prototype, "allotment_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], AllotmentRegisterDto.prototype, "days_to_delivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], AllotmentRegisterDto.prototype, "place_to_delivery", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], AllotmentRegisterDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], AllotmentRegisterDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: proposal_register_request_dto_1.ProposalRegisterDto }),
    __metadata("design:type", Array)
], AllotmentRegisterDto.prototype, "proposals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: item_register_request_dto_1.ItemRequestDto }),
    __metadata("design:type", Array)
], AllotmentRegisterDto.prototype, "add_item", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: allotment_status_enum_1.AllotmentStatusEnum, type: String }),
    __metadata("design:type", String)
], AllotmentRegisterDto.prototype, "status", void 0);
exports.AllotmentRegisterDto = AllotmentRegisterDto;
//# sourceMappingURL=allotment-register-request.dto.js.map