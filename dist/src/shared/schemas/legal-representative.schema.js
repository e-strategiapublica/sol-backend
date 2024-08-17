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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalRepresentativeSchema = exports.LegalRepresentative = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const address_schema_1 = require("./address.schema");
const marital_status_enum_1 = require("../../modules/SOL/enums/marital-status.enum");
let LegalRepresentative = class LegalRepresentative {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "nationality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(marital_status_enum_1.MaritalStatusEnum) }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "maritalStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "cpf", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "rg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], LegalRepresentative.prototype, "document_origin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: false }),
    __metadata("design:type", Date)
], LegalRepresentative.prototype, "validityData", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: address_schema_1.AddressSchema, required: true }),
    __metadata("design:type", address_schema_1.Address)
], LegalRepresentative.prototype, "address", void 0);
LegalRepresentative = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], LegalRepresentative);
exports.LegalRepresentative = LegalRepresentative;
exports.LegalRepresentativeSchema = mongoose_1.SchemaFactory.createForClass(LegalRepresentative);
//# sourceMappingURL=legal-representative.schema.js.map