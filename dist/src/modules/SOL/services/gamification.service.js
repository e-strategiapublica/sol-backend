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
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const gamification_schema_1 = require("../schemas/gamification.schema");
let GamificationService = class GamificationService {
    constructor(gamificationModel) {
        this.gamificationModel = gamificationModel;
    }
    async getUserGamification(userId) {
        return this.gamificationModel.find({ userId }).exec();
    }
    async getAllGamification() {
        return this.gamificationModel.find().exec();
    }
    async addPoints(addPointsDto) {
        try {
            const { userId, points, rewards } = addPointsDto;
            console.log('Adding points:', { userId, points, rewards });
            const gamification = await this.gamificationModel.findOneAndUpdate({ userId }, {
                $inc: { points },
                $setOnInsert: { userId },
                $push: { rewards: { $each: rewards } },
            }, { upsert: true, new: true });
            if (!gamification) {
                throw new Error('Gamification record not found or created');
            }
            gamification.level = Math.floor(gamification.points / 100) + 1;
            await gamification.save();
            console.log('Successfully added points:', gamification);
            return gamification;
        }
        catch (error) {
            console.error('Error adding points:', error);
            throw new Error('Failed to add points and rewards: ' + error.message);
        }
    }
    async getRanking() {
        const gamifications = await this.gamificationModel.find().exec();
        return gamifications.map(gamification => ({
            id: gamification._id.toString(),
            name: gamification.name,
            email: gamification.email,
            points: gamification.points,
        }));
    }
};
GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gamification_schema_1.Gamification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GamificationService);
exports.GamificationService = GamificationService;
//# sourceMappingURL=gamification.service.js.map