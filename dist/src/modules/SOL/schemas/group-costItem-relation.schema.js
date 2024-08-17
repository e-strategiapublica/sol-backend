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
var GroupCostItemRealation_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupCostItemRealationSchema = exports.GroupCostItemRealation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let GroupCostItemRealation = GroupCostItemRealation_1 = class GroupCostItemRealation {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], GroupCostItemRealation.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], GroupCostItemRealation.prototype, "cost_item_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], GroupCostItemRealation.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], GroupCostItemRealation.prototype, "estimated_cost", void 0);
GroupCostItemRealation = GroupCostItemRealation_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: GroupCostItemRealation_1.name.toLowerCase() })
], GroupCostItemRealation);
exports.GroupCostItemRealation = GroupCostItemRealation;
exports.GroupCostItemRealationSchema = mongoose_1.SchemaFactory.createForClass(GroupCostItemRealation);
//# sourceMappingURL=group-costItem-relation.schema.js.map