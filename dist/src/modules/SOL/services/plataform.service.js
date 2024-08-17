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
var PlataformService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlataformService = void 0;
const common_1 = require("@nestjs/common");
const plataform_repository_1 = require("../repositories/plataform.repository");
let PlataformService = PlataformService_1 = class PlataformService {
    constructor(_plataformRepository) {
        this._plataformRepository = _plataformRepository;
        this._logger = new common_1.Logger(PlataformService_1.name);
    }
    async register(dto) {
        const config = await this._plataformRepository.findOne();
        if (config) {
            return await this._plataformRepository.update(config._id, dto);
        }
        return await this._plataformRepository.register(dto);
    }
    async findOne() {
        return await this._plataformRepository.findOne();
    }
    async update(_id, dto) {
        return await this._plataformRepository.update(_id, dto);
    }
};
PlataformService = PlataformService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [plataform_repository_1.PlataformRepository])
], PlataformService);
exports.PlataformService = PlataformService;
//# sourceMappingURL=plataform.service.js.map