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
exports.NotificationSubscribeDto = exports.PushNotificationTokenRegisterDto = exports.PushNotificationTokenKeyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PushNotificationTokenKeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PushNotificationTokenKeyDto.prototype, "p256dh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PushNotificationTokenKeyDto.prototype, "auth", void 0);
exports.PushNotificationTokenKeyDto = PushNotificationTokenKeyDto;
class PushNotificationTokenRegisterDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PushNotificationTokenRegisterDto.prototype, "enpoint", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PushNotificationTokenRegisterDto.prototype, "expirationTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PushNotificationTokenKeyDto)
], PushNotificationTokenRegisterDto.prototype, "keys", void 0);
exports.PushNotificationTokenRegisterDto = PushNotificationTokenRegisterDto;
class NotificationSubscribeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NotificationSubscribeDto.prototype, "token", void 0);
exports.NotificationSubscribeDto = NotificationSubscribeDto;
//# sourceMappingURL=notification-subscribe.dto.js.map