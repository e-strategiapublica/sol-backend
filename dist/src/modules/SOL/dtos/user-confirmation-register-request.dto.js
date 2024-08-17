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
exports.UserConfirmationRegisterSendRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_confirmation_register_type_send_enum_1 = require("../enums/user-confirmation-register-type-send.enum");
class UserConfirmationRegisterSendRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: Object.keys(user_confirmation_register_type_send_enum_1.UserConfirmationRegisterTypeEnum) }),
    __metadata("design:type", String)
], UserConfirmationRegisterSendRequestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", String)
], UserConfirmationRegisterSendRequestDto.prototype, "value", void 0);
exports.UserConfirmationRegisterSendRequestDto = UserConfirmationRegisterSendRequestDto;
//# sourceMappingURL=user-confirmation-register-request.dto.js.map