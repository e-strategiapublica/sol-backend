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
var WorkPlan_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkPlanSchema = exports.WorkPlan = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let WorkPlan = WorkPlan_1 = class WorkPlan {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], WorkPlan.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: [
            {
                quantity: { type: Number, required: true },
                unitValue: { type: Number, required: true },
                unit: { type: String },
                items: { type: mongoose_2.default.Schema.Types.ObjectId, required: true },
            },
        ],
    }),
    __metadata("design:type", Array)
], WorkPlan.prototype, "product", void 0);
WorkPlan = WorkPlan_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: WorkPlan_1.name.toLowerCase() })
], WorkPlan);
exports.WorkPlan = WorkPlan;
exports.WorkPlanSchema = mongoose_1.SchemaFactory.createForClass(WorkPlan);
//# sourceMappingURL=work-plan.schema.js.map