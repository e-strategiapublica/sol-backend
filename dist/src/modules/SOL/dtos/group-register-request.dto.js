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
exports.GroupRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const group_costItem_relation_register_request_dto_1 = require("./group-costItem-relation-register-request.dto");
class GroupRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], GroupRegisterDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], GroupRegisterDto.prototype, "idAgreements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: group_costItem_relation_register_request_dto_1.GroupCostItemRelationDto }),
    __metadata("design:type", Array)
], GroupRegisterDto.prototype, "items", void 0);
exports.GroupRegisterDto = GroupRegisterDto;
//# sourceMappingURL=group-register-request.dto.js.map