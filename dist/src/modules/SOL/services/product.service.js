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
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../repositories/product.repository");
const crypto_1 = require("crypto");
let ProductService = ProductService_1 = class ProductService {
    constructor(_productRepository) {
        this._productRepository = _productRepository;
        this._logger = new common_1.Logger(ProductService_1.name);
    }
    async register(dto) {
        let numeroAleatorio = parseInt((0, crypto_1.randomBytes)(2).toString('hex'), 16) % 10000;
        const verify = await this._productRepository.getByIdentifier(numeroAleatorio);
        if (verify) {
            numeroAleatorio = parseInt((0, crypto_1.randomBytes)(2).toString('hex'), 16) % 10000;
        }
        dto.identifier = numeroAleatorio;
        const result = await this._productRepository.register(dto);
        return result;
    }
    async list() {
        const result = await this._productRepository.list();
        return result;
    }
    async update(_id, dto) {
        const item = await this._productRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException('Produto não encontrado!');
        }
        const result = await this._productRepository.update(_id, dto);
        return result;
    }
    async getById(_id) {
        const result = await this._productRepository.getById(_id);
        if (!result) {
            throw new common_1.BadRequestException('Grupo não encontrado!');
        }
        return result;
    }
    async deleteById(_id) {
        return await this._productRepository.deleteById(_id);
    }
    getByName(name) {
        return this._productRepository.getByName(name);
    }
};
ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map