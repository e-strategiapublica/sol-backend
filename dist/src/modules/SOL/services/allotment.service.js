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
var AllotmentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllotmentService = void 0;
const common_1 = require("@nestjs/common");
const allotment_repository_1 = require("../repositories/allotment.repository");
const file_repository_1 = require("../repositories/file.repository");
const allotment_status_enum_1 = require("../enums/allotment-status.enum");
let AllotmentService = AllotmentService_1 = class AllotmentService {
    constructor(_allotmentRepository, _fileRepository) {
        this._allotmentRepository = _allotmentRepository;
        this._fileRepository = _fileRepository;
        this._logger = new common_1.Logger(AllotmentService_1.name);
    }
    async register(dto) {
        dto.status = allotment_status_enum_1.AllotmentStatusEnum.rascunho;
        const result = await this._allotmentRepository.register(dto);
        if (!result)
            throw new common_1.BadRequestException("Não foi possivel cadastrar essa essa proposta!");
        return result;
    }
    async list() {
        const result = await this._allotmentRepository.list();
        return result;
    }
    async listById(_id) {
        const result = await this._allotmentRepository.listById(_id);
        if (!result) {
            throw new common_1.BadRequestException("Não foi possivel cadastrar essa essa proposta!");
        }
        return result;
    }
    async updateStatus(_id, status) {
        const item = await this._allotmentRepository.listById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Não foi possivel cadastrar essa essa proposta!");
        }
        item.status = status;
        const result = await this._allotmentRepository.updateStauts(_id, item.status);
        return result;
    }
    async updateProposal(_id, dto) {
        const item = await this._allotmentRepository.listById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Não foi possivel cadastrar essa essa proposta!');
        }
        return;
    }
    async downloadAllotmentById(_id) {
        const result = await this._allotmentRepository.listById(_id);
        if (!result) {
            throw new common_1.BadRequestException('Não foi possivel cadastrar essa essa proposta!');
        }
        return this._fileRepository.download(result.files);
    }
    async updateItem(_id, dto) {
        const result = await this._allotmentRepository.updateItem(_id, dto);
        return result;
    }
};
AllotmentService = AllotmentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [allotment_repository_1.AllotmentRepository,
        file_repository_1.FileRepository])
], AllotmentService);
exports.AllotmentService = AllotmentService;
//# sourceMappingURL=allotment.service.js.map