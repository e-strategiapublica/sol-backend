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
exports.RegistryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const registry_schema_1 = require("../schemas/registry.schema");
const ethers_1 = require("ethers");
const RegistryContractJson = require("../../../assets/Registry.json");
const config_1 = require("@nestjs/config");
const enviroment_variables_enum_1 = require("../../../shared/enums/enviroment.variables.enum");
const security_service_1 = require("../../../shared/services/security.service");
let RegistryRepository = class RegistryRepository {
    constructor(_model, _configService, _securityService) {
        this._model = _model;
        this._configService = _configService;
        this._securityService = _securityService;
    }
    async getById(_id) {
        return await this._model
            .findOne({ _id });
    }
    async listByWallet(wallet) {
        return await this._model
            .find({
            wallet,
        });
    }
    async getByTransactionHash(transactionHash) {
        return await this._model
            .findOne({ transactionHash });
    }
    async register(dto) {
        const data = await new this._model(dto);
        return data.save();
    }
    async send(dto) {
        var _a, _b;
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.PROVIDER));
        const ownerAddress = this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.OWNER_ADDRESS);
        const pkey = (_a = this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.ADMIN_PRIVATE_KEY)) !== null && _a !== void 0 ? _a : '';
        if (pkey.length != 64)
            throw new common_1.HttpException('Internal Server Error: Account connection not set up', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        const address = (_b = this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.REGISTRY_CONTRACT_ADDRESS)) !== null && _b !== void 0 ? _b : '';
        if (address.length != 42)
            throw new common_1.HttpException('Internal Server Error: Contract connection not set up', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        const signer = new ethers_1.Wallet(pkey, provider);
        const contract = new ethers_1.Contract(address, RegistryContractJson.abi, signer);
        const payload = JSON.stringify(dto);
        const payloadId = ethers_1.ethers.utils.id(payload);
        const tx = await contract.register(ownerAddress, dto.id, payloadId);
        await tx.wait();
        return {
            ownerAddress,
            txHash: tx.hash,
            payload,
        };
    }
};
RegistryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(registry_schema_1.Registry.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        security_service_1.SecurityService])
], RegistryRepository);
exports.RegistryRepository = RegistryRepository;
//# sourceMappingURL=registry.repository.js.map