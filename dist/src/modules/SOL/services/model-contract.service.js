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
var ModelContractService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelContractService = void 0;
const common_1 = require("@nestjs/common");
const model_contract_repository_1 = require("../repositories/model-contract.repository");
const bid_repository_1 = require("../repositories/bid.repository");
const fs = require("fs");
const path = require("path");
let ModelContractService = ModelContractService_1 = class ModelContractService {
    constructor(_modelContractRepository, _bidsRepository) {
        this._modelContractRepository = _modelContractRepository;
        this._bidsRepository = _bidsRepository;
        this._logger = new common_1.Logger(ModelContractService_1.name);
    }
    async register(dto, file) {
        const modelContract = await this._modelContractRepository.getByContractAndLanguage(dto.language, dto.classification);
        if (modelContract) {
            throw new common_1.BadRequestException('Já existe um modelo de contrato cadastrado com essas informações!');
        }
        await fs.writeFileSync(path.resolve("src/shared/documents", file.originalname), file.buffer);
        dto.contract = file.originalname;
        const result = await this._modelContractRepository.register(dto);
        if (!result)
            throw new common_1.BadRequestException('Não foi possivel cadastrar esse modelo de contrato!');
        return result;
    }
    async list() {
        const result = await this._modelContractRepository.list();
        return result;
    }
    async update(_id, dto, file) {
        const modelContract = await this._modelContractRepository.getByContractAndLanguage(dto.language, dto.classification);
        if (modelContract) {
            if (modelContract._id != _id)
                throw new common_1.BadRequestException('Já existe um modelo de contrato cadastrado com essas informações!');
        }
        if (fs.existsSync(path.resolve("src/shared/documents", dto.contract)))
            await fs.unlinkSync(path.resolve("src/shared/documents", dto.contract));
        await fs.writeFileSync(path.resolve("src/shared/documents", file.originalname), file.buffer);
        dto.contract = file.originalname;
        const result = await this._modelContractRepository.update(_id, dto);
        return result;
    }
    async getById(_id) {
        const result = await this._modelContractRepository.getById(_id);
        return result;
    }
    async getBidById(_id) {
        const result = await this._bidsRepository.getBidById(_id);
        if (!result) {
            throw new common_1.BadRequestException("Licitação não encontrada!");
        }
        return result;
    }
    async deleteById(_id) {
        return await this._modelContractRepository.deleteById(_id);
    }
};
ModelContractService = ModelContractService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [model_contract_repository_1.ModelContractRepository,
        bid_repository_1.BidRepository])
], ModelContractService);
exports.ModelContractService = ModelContractService;
//# sourceMappingURL=model-contract.service.js.map