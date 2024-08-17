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
var Allotment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllotmentSchema = exports.Allotment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const items_schema_1 = require("./items.schema");
const allotment_status_enum_1 = require("../enums/allotment-status.enum");
let Allotment = Allotment_1 = class Allotment {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Allotment.prototype, "allotment_name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Allotment.prototype, "days_to_delivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Allotment.prototype, "place_to_delivery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Allotment.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Allotment.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        enum: Object.keys(allotment_status_enum_1.AllotmentStatusEnum),
        default: allotment_status_enum_1.AllotmentStatusEnum.rascunho,
    }),
    __metadata("design:type", String)
], Allotment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.Array, ref: items_schema_1.Items.name }),
    __metadata("design:type", Array)
], Allotment.prototype, "add_item", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.Array }),
    __metadata("design:type", Array)
], Allotment.prototype, "proposals", void 0);
Allotment = Allotment_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: Allotment_1.name.toLowerCase() })
], Allotment);
exports.Allotment = Allotment;
exports.AllotmentSchema = mongoose_1.SchemaFactory.createForClass(Allotment);
//# sourceMappingURL=allotment.schema.js.map