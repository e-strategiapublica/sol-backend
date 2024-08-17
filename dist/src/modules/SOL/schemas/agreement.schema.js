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
var Agreement_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgreementSchema = exports.Agreement = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("./user.schema");
const agreement_status_enum_1 = require("../enums/agreement-status.enum");
const association_schema_1 = require("./association.schema");
const work_plan_schema_1 = require("./work-plan.schema");
const agreement_active_status_1 = require("../enums/agreement-active-status");
const project_schema_1 = require("./project.schema");
let Agreement = Agreement_1 = class Agreement {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Agreement.prototype, "register_number", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Agreement.prototype, "register_object", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(agreement_status_enum_1.AgreementStatusEnum) }),
    __metadata("design:type", String)
], Agreement.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Agreement.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Agreement.prototype, "states", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Agreement.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Agreement.prototype, "signature_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", Date)
], Agreement.prototype, "validity_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: association_schema_1.Association.name }),
    __metadata("design:type", association_schema_1.Association)
], Agreement.prototype, "association", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: project_schema_1.Project.name }),
    __metadata("design:type", project_schema_1.Project)
], Agreement.prototype, "project", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Agreement.prototype, "manager", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose.Types.ObjectId, ref: work_plan_schema_1.WorkPlan.name }] }),
    __metadata("design:type", Array)
], Agreement.prototype, "workPlan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, enum: Object.keys(agreement_active_status_1.AgreementActiveStatusEnum), default: agreement_active_status_1.AgreementActiveStatusEnum.active }),
    __metadata("design:type", String)
], Agreement.prototype, "activeStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Agreement.prototype, "reviewer", void 0);
Agreement = Agreement_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Agreement_1.name.toLowerCase() })
], Agreement);
exports.Agreement = Agreement;
exports.AgreementSchema = mongoose_1.SchemaFactory.createForClass(Agreement);
//# sourceMappingURL=agreement.schema.js.map