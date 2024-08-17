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
exports.BlockchainManager = void 0;
const common_1 = require("@nestjs/common");
const error_manager_1 = require("../../../../shared/utils/error.manager");
const lacchain_model_1 = require("./lacchain.model");
let BlockchainManager = class BlockchainManager {
    constructor(lacchainModel) {
        this.lacchainModel = lacchainModel;
    }
    async getData() {
        try {
        }
        catch (e) {
            throw error_manager_1.ErrorManager.createError(e);
        }
    }
    async setData() {
        try {
        }
        catch (e) {
            throw error_manager_1.ErrorManager.createError(e);
        }
    }
};
BlockchainManager = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lacchain_model_1.LacchainModel])
], BlockchainManager);
exports.BlockchainManager = BlockchainManager;
//# sourceMappingURL=blockchainManager.model.js.map