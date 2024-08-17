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
exports.LacchainModel = void 0;
const common_1 = require("@nestjs/common");
const error_manager_1 = require("../../../../shared/utils/error.manager");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
let LacchainModel = class LacchainModel {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    async getBidData(_bidHistoryId) {
        try {
            const res = await this.httpService.get(`http://216.238.103.122:3002/api/lacchain/bid/getData/${_bidHistoryId}`).toPromise();
            return res.data;
        }
        catch (e) {
            throw error_manager_1.ErrorManager.createError(e);
        }
    }
    async setBidData(token, bidHistoryId, hash) {
        try {
            const headers = {
                Authorization: token
            };
            const data = {
                bidHistoryId: bidHistoryId,
                hash: hash
            };
            const res = await this.httpService.post("http://216.238.103.122:3002/api/lacchain/bid/setData", data, { headers }).toPromise();
            if (res.data['type'] == "error") {
                return '0x0000000000000000000000000000000000000000000000000000000000000000';
            }
            return res.data;
        }
        catch (e) {
            throw error_manager_1.ErrorManager.createError(e);
        }
    }
};
LacchainModel = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], LacchainModel);
exports.LacchainModel = LacchainModel;
//# sourceMappingURL=lacchain.model.js.map