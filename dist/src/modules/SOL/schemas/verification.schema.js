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
var Verification_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationSchema = exports.Verification = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("./user.schema");
let Verification = Verification_1 = class Verification {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Verification.prototype, "attempt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", String)
], Verification.prototype, "deadline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", user_schema_1.User)
], Verification.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Verification.prototype, "code", void 0);
Verification = Verification_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Verification_1.name.toLowerCase() })
], Verification);
exports.Verification = Verification;
exports.VerificationSchema = mongoose_1.SchemaFactory.createForClass(Verification);
//# sourceMappingURL=verification.schema.js.map