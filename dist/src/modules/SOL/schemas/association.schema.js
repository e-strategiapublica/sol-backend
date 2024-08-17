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
var Association_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationSchema = exports.Association = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const address_schema_1 = require("../../../shared/schemas/address.schema");
const legal_representative_schema_1 = require("../../../shared/schemas/legal-representative.schema");
const association_status_enum_1 = require("../enums/association-status.enum");
let Association = Association_1 = class Association {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Association.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Association.prototype, "cnpj", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: legal_representative_schema_1.LegalRepresentativeSchema, required: false }),
    __metadata("design:type", legal_representative_schema_1.LegalRepresentative)
], Association.prototype, "legalRepresentative", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: address_schema_1.AddressSchema, required: false }),
    __metadata("design:type", address_schema_1.Address)
], Association.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, enum: Object.keys(association_status_enum_1.AssociationStatusEnum), default: association_status_enum_1.AssociationStatusEnum.active }),
    __metadata("design:type", String)
], Association.prototype, "status", void 0);
Association = Association_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Association_1.name.toLowerCase() })
], Association);
exports.Association = Association;
exports.AssociationSchema = mongoose_1.SchemaFactory.createForClass(Association);
//# sourceMappingURL=association.schema.js.map