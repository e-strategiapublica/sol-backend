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
var Project_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = exports.Project = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("./user.schema");
const agreement_active_status_1 = require("../enums/agreement-active-status");
const legal_representative_schema_1 = require("../../../shared/schemas/legal-representative.schema");
let Project = Project_1 = class Project {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(agreement_active_status_1.AgreementActiveStatusEnum), default: agreement_active_status_1.AgreementActiveStatusEnum.active }),
    __metadata("design:type", String)
], Project.prototype, "activeStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Project.prototype, "project_manager", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: legal_representative_schema_1.LegalRepresentativeSchema, required: true }),
    __metadata("design:type", legal_representative_schema_1.LegalRepresentative)
], Project.prototype, "legalRepresentative", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }] }),
    __metadata("design:type", user_schema_1.User)
], Project.prototype, "viewer_list", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }] }),
    __metadata("design:type", user_schema_1.User)
], Project.prototype, "reviewer_list", void 0);
Project = Project_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Project_1.name.toLowerCase() })
], Project);
exports.Project = Project;
exports.ProjectSchema = mongoose_1.SchemaFactory.createForClass(Project);
//# sourceMappingURL=project.schema.js.map