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
var GroupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const group_repository_1 = require("../repositories/group.repository");
let GroupService = GroupService_1 = class GroupService {
    constructor(_groupRepository) {
        this._groupRepository = _groupRepository;
        this._logger = new common_1.Logger(GroupService_1.name);
    }
    async register(dto) {
        const result = await this._groupRepository.register(dto);
        if (!result)
            throw new common_1.BadRequestException('Não foi possivel cadastrar esse grupo!');
        return result;
    }
    async list() {
        const result = await this._groupRepository.list();
        return result;
    }
    async updateName(_id, dto) {
        const item = await this._groupRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Grupo não encontrado!');
        }
        const result = await this._groupRepository.updateName(_id, dto);
        return result;
    }
    async addItem(_id, dto) {
        const item = await this._groupRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Grupo não encontrado!');
        }
        const result = await this._groupRepository.addItem(_id, dto);
        return result;
    }
    async removeItem(_id, dto) {
        const item = await this._groupRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Grupo não encontrado!');
        }
        const result = await this._groupRepository.removeItem(_id, dto);
        return result;
    }
    async getById(_id) {
        const result = await this._groupRepository.getById(_id);
        if (!result) {
            throw new common_1.BadRequestException('Grupo não encontrado!');
        }
        return result;
    }
    async deleteById(_id) {
        return await this._groupRepository.deleteById(_id);
    }
};
GroupService = GroupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [group_repository_1.GroupRepository])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map