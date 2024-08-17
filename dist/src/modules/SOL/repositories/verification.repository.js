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
var VerificationRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const verification_schema_1 = require("../schemas/verification.schema");
let VerificationRepository = VerificationRepository_1 = class VerificationRepository {
    constructor(model) {
        this.model = model;
        this.logger = new common_1.Logger(VerificationRepository_1.name);
    }
    async save(dto) {
        const data = new this.model(dto);
        return await data.save();
    }
    async getById(id) {
        return await this.model.findById(id);
    }
    async getByUser(user) {
        return await this.model.findOne({ user: user._id.toString() })
            .populate('user');
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
    async incrementAttempt(_id, attempt) {
        return await this.model.findOneAndUpdate({ _id }, {
            $set: {
                attempt,
            },
        });
    }
};
VerificationRepository = VerificationRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(verification_schema_1.Verification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VerificationRepository);
exports.VerificationRepository = VerificationRepository;
//# sourceMappingURL=verification.repository.js.map