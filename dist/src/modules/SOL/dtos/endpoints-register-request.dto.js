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
exports.EndPointsRegisterRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const endpoints_status_enum_1 = require("../enums/endpoints-status.enum");
const endpoints_type_enum_1 = require("../enums/endpoints-type.enum");
class EndPointsRegisterRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], EndPointsRegisterRequestDto.prototype, "endpointPath", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], EndPointsRegisterRequestDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: String }),
    __metadata("design:type", String)
], EndPointsRegisterRequestDto.prototype, "frequency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Date, default: null }),
    __metadata("design:type", Date)
], EndPointsRegisterRequestDto.prototype, "lastRun", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: Object.keys(endpoints_status_enum_1.EndPointsStatusEnum), default: endpoints_status_enum_1.EndPointsStatusEnum.stopped }),
    __metadata("design:type", String)
], EndPointsRegisterRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, enum: Object.keys(endpoints_type_enum_1.EndPointsTypeEnum) }),
    __metadata("design:type", String)
], EndPointsRegisterRequestDto.prototype, "endpointType", void 0);
exports.EndPointsRegisterRequestDto = EndPointsRegisterRequestDto;
//# sourceMappingURL=endpoints-register-request.dto.js.map