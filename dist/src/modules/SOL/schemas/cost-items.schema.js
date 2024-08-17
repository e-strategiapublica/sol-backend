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
var CostItems_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostItemsSchema = exports.CostItems = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const unit_measure_enum_1 = require("../enums/unit-measure.enum");
const category_schema_1 = require("./category.schema");
const mongoose = require("mongoose");
const product_schema_1 = require("./product.schema");
let CostItems = CostItems_1 = class CostItems {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], CostItems.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, type: String }),
    __metadata("design:type", String)
], CostItems.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, enum: Object.keys(unit_measure_enum_1.UnitMeasureEnum) }),
    __metadata("design:type", String)
], CostItems.prototype, "unitMeasure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], CostItems.prototype, "specification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean }),
    __metadata("design:type", Boolean)
], CostItems.prototype, "sustainable", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: category_schema_1.Category.name }),
    __metadata("design:type", category_schema_1.Category)
], CostItems.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: product_schema_1.Products.name }),
    __metadata("design:type", product_schema_1.Products)
], CostItems.prototype, "product", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], CostItems.prototype, "product_relation", void 0);
CostItems = CostItems_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: CostItems_1.name.toLowerCase() })
], CostItems);
exports.CostItems = CostItems;
exports.CostItemsSchema = mongoose_1.SchemaFactory.createForClass(CostItems);
//# sourceMappingURL=cost-items.schema.js.map