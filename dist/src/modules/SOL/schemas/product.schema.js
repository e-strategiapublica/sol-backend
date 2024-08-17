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
var Products_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsSchema = exports.Products = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Products = Products_1 = class Products {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Products.prototype, "product_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, type: Number }),
    __metadata("design:type", Number)
], Products.prototype, "identifier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Products.prototype, "pdm", void 0);
Products = Products_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Products_1.name.toLowerCase() })
], Products);
exports.Products = Products;
exports.ProductsSchema = mongoose_1.SchemaFactory.createForClass(Products);
//# sourceMappingURL=product.schema.js.map