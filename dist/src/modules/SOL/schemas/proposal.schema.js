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
var Proposal_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposaltSchema = exports.Proposal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const proposal_status_enum_1 = require("../enums/proposal-status.enum");
const bids_schema_1 = require("./bids.schema");
const mongoose = require("mongoose");
const allotment_schema_1 = require("./allotment.schema");
const user_schema_1 = require("./user.schema");
let Proposal = Proposal_1 = class Proposal {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Proposal.prototype, "total_value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Proposal.prototype, "association_accept", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Proposal.prototype, "supplier_accept", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Proposal.prototype, "reviewer_accept", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(proposal_status_enum_1.ProposalStatusEnum), default: proposal_status_enum_1.ProposalStatusEnum.aguardando1 }),
    __metadata("design:type", String)
], Proposal.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Proposal.prototype, "deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Array }),
    __metadata("design:type", Array)
], Proposal.prototype, "item_list", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: bids_schema_1.Bids.name }),
    __metadata("design:type", bids_schema_1.Bids)
], Proposal.prototype, "bid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.ObjectId, ref: allotment_schema_1.Allotment.name }] }),
    __metadata("design:type", Array)
], Proposal.prototype, "allotment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Proposal.prototype, "file", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false, type: Boolean }),
    __metadata("design:type", Boolean)
], Proposal.prototype, "proposalWin", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Proposal.prototype, "refusedBecaused", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Proposal.prototype, "refusedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Proposal.prototype, "proposedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Proposal.prototype, "acceptedRevisor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Proposal.prototype, "acceptedFornecedor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date }),
    __metadata("design:type", Date)
], Proposal.prototype, "acceptedFornecedorAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date }),
    __metadata("design:type", Date)
], Proposal.prototype, "acceptedRevisorAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date }),
    __metadata("design:type", Date)
], Proposal.prototype, "refusedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number }),
    __metadata("design:type", Number)
], Proposal.prototype, "freight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Schema.Types.Array }] }),
    __metadata("design:type", Array)
], Proposal.prototype, "totalValueForAllotment", void 0);
Proposal = Proposal_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Proposal_1.name.toLowerCase() })
], Proposal);
exports.Proposal = Proposal;
exports.ProposaltSchema = mongoose_1.SchemaFactory.createForClass(Proposal);
//# sourceMappingURL=proposal.schema.js.map