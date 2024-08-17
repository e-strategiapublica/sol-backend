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
var Contract_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractSchema = exports.Contract = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const contract_status_enum_1 = require("../enums/contract-status.enum");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const bids_schema_1 = require("./bids.schema");
const supplier_schema_1 = require("./supplier.schema");
const proposal_schema_1 = require("./proposal.schema");
let Contract = Contract_1 = class Contract {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Contract.prototype, "sequencial_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Contract.prototype, "contract_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.ObjectId, ref: bids_schema_1.Bids.name }),
    __metadata("design:type", bids_schema_1.Bids)
], Contract.prototype, "bid_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean }),
    __metadata("design:type", Boolean)
], Contract.prototype, "association_accept", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean }),
    __metadata("design:type", Boolean)
], Contract.prototype, "supplier_accept", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Contract.prototype, "association_sign_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Contract.prototype, "supplier_sign_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Contract.prototype, "contract_document", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Contract.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Contract.prototype, "deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(contract_status_enum_1.ContractStatusEnum), default: contract_status_enum_1.ContractStatusEnum.aguardando_assinaturas }),
    __metadata("design:type", String)
], Contract.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: proposal_schema_1.Proposal.name }] }),
    __metadata("design:type", Array)
], Contract.prototype, "proposal_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.ObjectId, ref: supplier_schema_1.Supplier.name }),
    __metadata("design:type", supplier_schema_1.Supplier)
], Contract.prototype, "supplier_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Contract.prototype, "association_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Contract.prototype, "items_received", void 0);
Contract = Contract_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Contract_1.name.toLowerCase() })
], Contract);
exports.Contract = Contract;
exports.ContractSchema = mongoose_1.SchemaFactory.createForClass(Contract);
//# sourceMappingURL=contract.schema.js.map