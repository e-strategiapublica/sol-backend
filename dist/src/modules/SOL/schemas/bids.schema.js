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
var Bids_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidsSchema = exports.Bids = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("./user.schema");
const bid_type_enum_1 = require("../enums/bid-type.enum");
const bid_modality_enum_1 = require("../enums/bid-modality.enum");
const allotment_schema_1 = require("./allotment.schema");
const bid_status_enum_1 = require("../enums/bid-status.enum");
const agreement_schema_1 = require("./agreement.schema");
const supplier_schema_1 = require("./supplier.schema");
let Bids = Bids_1 = class Bids {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "bid_count", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: agreement_schema_1.Agreement.name }),
    __metadata("design:type", agreement_schema_1.Agreement)
], Bids.prototype, "agreement", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "classification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "start_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "end_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "days_to_tiebreaker", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "days_to_delivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Array }),
    __metadata("design:type", Array)
], Bids.prototype, "proposal_list", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Bids.prototype, "deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "local_to_delivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(bid_type_enum_1.BidTypeEnum) }),
    __metadata("design:type", String)
], Bids.prototype, "bid_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(bid_modality_enum_1.BidModalityEnum) }),
    __metadata("design:type", String)
], Bids.prototype, "modality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: bid_status_enum_1.BidStatusEnum.draft, enum: Object.keys(bid_status_enum_1.BidStatusEnum) }),
    __metadata("design:type", String)
], Bids.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "aditional_site", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "declined_reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: allotment_schema_1.Allotment.name }], remove: true }),
    __metadata("design:type", Array)
], Bids.prototype, "add_allotment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: supplier_schema_1.Supplier.name }] }),
    __metadata("design:type", Array)
], Bids.prototype, "invited_suppliers", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "editalFile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "ataFile", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Bids.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Bids.prototype, "association", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], Bids.prototype, "additionalDocuments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date }),
    __metadata("design:type", Date)
], Bids.prototype, "concludedAt", void 0);
Bids = Bids_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Bids_1.name.toLowerCase() })
], Bids);
exports.Bids = Bids;
exports.BidsSchema = mongoose_1.SchemaFactory.createForClass(Bids);
//# sourceMappingURL=bids.schema.js.map