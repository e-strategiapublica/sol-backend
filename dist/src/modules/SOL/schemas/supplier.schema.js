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
var Supplier_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierSchema = exports.Supplier = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const legal_representative_schema_1 = require("../../../shared/schemas/legal-representative.schema");
const notification_schema_1 = require("./notification.schema");
const category_schema_1 = require("./category.schema");
const supplier_type_enum_1 = require("../enums/supplier-type.enum");
const address_schema_1 = require("../../../shared/schemas/address.schema");
let Supplier = Supplier_1 = class Supplier {
};
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Supplier.prototype, "cpf", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "blocked", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Supplier.prototype, "blocked_reason", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, enum: Object.keys(supplier_type_enum_1.SuplierTypeEnum) }),
    __metadata("design:type", String)
], Supplier.prototype, "type", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: address_schema_1.AddressSchema, required: true }),
    __metadata("design:type", address_schema_1.Address)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: legal_representative_schema_1.LegalRepresentativeSchema, required: true }),
    __metadata("design:type", legal_representative_schema_1.LegalRepresentative)
], Supplier.prototype, "legal_representative", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: Array }),
    __metadata("design:type", Array)
], Supplier.prototype, "group_id", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: mongoose_1.default.Schema.Types.Array, ref: notification_schema_1.Notification.name }),
    __metadata("design:type", Array)
], Supplier.prototype, "notification_list", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: category_schema_1.Category.name }] }),
    __metadata("design:type", Array)
], Supplier.prototype, "categories", void 0);
Supplier = Supplier_1 = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true, collection: Supplier_1.name.toLowerCase() })
], Supplier);
exports.Supplier = Supplier;
exports.SupplierSchema = mongoose_2.SchemaFactory.createForClass(Supplier);
//# sourceMappingURL=supplier.schema.js.map