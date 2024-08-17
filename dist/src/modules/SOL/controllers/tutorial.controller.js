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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const swagger_1 = require("@nestjs/swagger");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const tutorial_location_enum_1 = require("../enums/tutorial-location.enum");
const tutorial_service_1 = require("../services/tutorial.service");
let TutorialController = class TutorialController {
    constructor(_tutorialService) {
        this._tutorialService = _tutorialService;
    }
    async getByScreenLocation(screenLocation, request) {
        try {
            if (!Object.keys(tutorial_location_enum_1.TutorialLocationEnum).includes(screenLocation)) {
                throw new common_1.BadRequestException('Screen location not reconized.');
            }
            let result = await this._tutorialService.getByScreenLocationWithUserId(screenLocation);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addCompletion(request, id) {
        try {
            const payload = request.user;
            const result = await this._tutorialService.addCompletion(id, payload.userId);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('select/:translate'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({
        name: 'screenLocation',
        allowEmptyValue: false,
        enum: tutorial_location_enum_1.TutorialLocationEnum,
        required: true
    }),
    __param(0, (0, common_1.Param)('screenLocation')),
    __param(1, (0, decorators_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "getByScreenLocation", null);
__decorate([
    (0, decorators_1.Put)('add-translate/translate-id/:id'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, decorators_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TutorialController.prototype, "addCompletion", null);
TutorialController = __decorate([
    (0, swagger_1.ApiTags)('translate'),
    (0, common_1.Controller)('translate'),
    __metadata("design:paramtypes", [tutorial_service_1.TutorialService])
], TutorialController);
exports.TutorialController = TutorialController;
//# sourceMappingURL=tutorial.controller.js.map