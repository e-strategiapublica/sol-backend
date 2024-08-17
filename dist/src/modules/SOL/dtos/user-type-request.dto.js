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
exports.UserTypeRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_roles_enum_1 = require("../enums/user-roles.enum");
class UserTypeRequestDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: user_roles_enum_1.UserRolesEnum }),
    __metadata("design:type", String)
], UserTypeRequestDto.prototype, "roles", void 0);
exports.UserTypeRequestDto = UserTypeRequestDto;
//# sourceMappingURL=user-type-request.dto.js.map