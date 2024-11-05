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
exports.GamificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gamification_service_1 = require("../services/gamification.service");
const addpoints_dto_1 = require("../dtos/addpoints.dto");
let GamificationController = class GamificationController {
    constructor(gamificationService) {
        this.gamificationService = gamificationService;
    }
    async getAllGamification() {
        return this.gamificationService.getAllGamification();
    }
    async getGamification(userId) {
        return this.gamificationService.getUserGamification(userId);
    }
    async addPoints(addPointsDto) {
        return this.gamificationService.addPoints(addPointsDto);
    }
    async getRanking() {
        return this.gamificationService.getRanking();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all gamification data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All gamification data retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getAllGamification", null);
__decorate([
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve gamification data for a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gamification data retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getGamification", null);
__decorate([
    (0, common_1.Post)('add-points'),
    (0, swagger_1.ApiOperation)({ summary: 'Add points to a user\'s gamification profile along with rewards' }),
    (0, swagger_1.ApiBody)({ type: addpoints_dto_1.AddPointsDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Points and rewards added successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addpoints_dto_1.AddPointsDto]),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "addPoints", null);
__decorate([
    (0, common_1.Get)('ranking'),
    (0, swagger_1.ApiOperation)({ summary: 'Get users ranking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User ranking retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GamificationController.prototype, "getRanking", null);
GamificationController = __decorate([
    (0, swagger_1.ApiTags)('gamification'),
    (0, common_1.Controller)('gamification'),
    __metadata("design:paramtypes", [gamification_service_1.GamificationService])
], GamificationController);
exports.GamificationController = GamificationController;
//# sourceMappingURL=gamification.controller.js.map