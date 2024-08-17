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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_status_enum_1 = require("../enums/user-status.enum");
const user_type_enum_1 = require("../enums/user-type.enum");
const user_roles_enum_1 = require("../enums/user-roles.enum");
const notification_schema_1 = require("./notification.schema");
const supplier_schema_1 = require("./supplier.schema");
const association_schema_1 = require("./association.schema");
let User = User_1 = class User {
};
__decorate([
    (0, mongoose_2.Prop)({ required: true, }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "document", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, enum: [user_status_enum_1.UserStatusEnum.active, user_status_enum_1.UserStatusEnum.inactive] }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true, enum: Object.keys(user_type_enum_1.UserTypeEnum) }),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false }),
    __metadata("design:type", String)
], User.prototype, "office", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: mongoose_1.default.Schema.Types.ObjectId, ref: association_schema_1.Association.name }),
    __metadata("design:type", association_schema_1.Association)
], User.prototype, "association", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: mongoose_1.default.Schema.Types.ObjectId, ref: supplier_schema_1.Supplier.name }),
    __metadata("design:type", supplier_schema_1.Supplier)
], User.prototype, "supplier", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, enum: Object.keys(user_roles_enum_1.UserRolesEnum) }),
    __metadata("design:type", String)
], User.prototype, "roles", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: false, type: mongoose_1.default.Schema.Types.Array, ref: notification_schema_1.Notification.name }),
    __metadata("design:type", Array)
], User.prototype, "notification_list", void 0);
User = User_1 = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true, collection: User_1.name.toLowerCase() })
], User);
exports.User = User;
exports.UserSchema = mongoose_2.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map