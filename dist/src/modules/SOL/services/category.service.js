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
var CategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("../repositories/category.repository");
const crypto_1 = require("crypto");
let CategoryService = CategoryService_1 = class CategoryService {
    constructor(_categoryRepository) {
        this._categoryRepository = _categoryRepository;
        this._logger = new common_1.Logger(CategoryService_1.name);
    }
    async register(dto) {
        let numeroAleatorio = parseInt((0, crypto_1.randomBytes)(2).toString('hex'), 16) % 10000;
        const verify = await this._categoryRepository.getByIdentifier(numeroAleatorio);
        if (verify) {
            numeroAleatorio = parseInt((0, crypto_1.randomBytes)(2).toString('hex'), 16) % 10000;
        }
        dto.identifier = numeroAleatorio;
        const result = await this._categoryRepository.register(dto);
        return result;
    }
    async list() {
        const result = await this._categoryRepository.list();
        return result;
    }
    async update(_id, dto) {
        const item = await this._categoryRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Categoria não encontrada!');
        }
        const result = await this._categoryRepository.update(_id, dto);
        return result;
    }
    async getById(_id) {
        const result = await this._categoryRepository.getById(_id);
        if (!result) {
            throw new common_1.BadRequestException('Categoria não encontrada!');
        }
        return result;
    }
    async deleteById(_id) {
        return await this._categoryRepository.deleteById(_id);
    }
};
CategoryService = CategoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map