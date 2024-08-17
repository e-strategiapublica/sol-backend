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
var Tutorial_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialSchema = exports.Tutorial = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tutorial_location_enum_1 = require("../enums/tutorial-location.enum");
const tutorial_type_enum_1 = require("../enums/tutorial-type.enum");
const user_schema_1 = require("./user.schema");
let Tutorial = Tutorial_1 = class Tutorial {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Tutorial.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, unique: true, enum: tutorial_location_enum_1.TutorialLocationEnum }),
    __metadata("design:type", String)
], Tutorial.prototype, "screenLocation", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], Tutorial.prototype, "screenBlock", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Tutorial.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Tutorial.prototype, "question", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], Tutorial.prototype, "alternatives", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Tutorial.prototype, "correctAnswer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Tutorial.prototype, "text", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Tutorial.prototype, "videoLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [{ type: mongoose_2.Types.ObjectId, ref: user_schema_1.User.name }] }),
    __metadata("design:type", Array)
], Tutorial.prototype, "usersWhoCompleted", void 0);
Tutorial = Tutorial_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Tutorial_1.name.toLowerCase() })
], Tutorial);
exports.Tutorial = Tutorial;
exports.TutorialSchema = mongoose_1.SchemaFactory.createForClass(Tutorial);
//# sourceMappingURL=tutorial.schema.js.map