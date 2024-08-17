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
var RegistryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryService = void 0;
const common_1 = require("@nestjs/common");
const registry_repository_1 = require("../repositories/registry.repository");
let RegistryService = RegistryService_1 = class RegistryService {
    constructor(_registryRepository) {
        this._registryRepository = _registryRepository;
        this._logger = new common_1.Logger(RegistryService_1.name);
    }
    async send(dto) {
        const result = await this._registryRepository.send(dto);
        await this._registryRepository.register({
            payload: result.payload,
            transactionHash: result.txHash,
            wallet: result.ownerAddress,
        });
        return result.txHash;
    }
};
RegistryService = RegistryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [registry_repository_1.RegistryRepository])
], RegistryService);
exports.RegistryService = RegistryService;
//# sourceMappingURL=registry.service.js.map