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
var Category_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const category_name_enum_1 = require("../enums/category-name.enum");
let Category = Category_1 = class Category {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(category_name_enum_1.CategoryNameEnum) }),
    __metadata("design:type", String)
], Category.prototype, "category_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Category.prototype, "segment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, type: Number }),
    __metadata("design:type", Number)
], Category.prototype, "identifier", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Category.prototype, "code", void 0);
Category = Category_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Category_1.name.toLowerCase() })
], Category);
exports.Category = Category;
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);
//# sourceMappingURL=category.schema.js.map