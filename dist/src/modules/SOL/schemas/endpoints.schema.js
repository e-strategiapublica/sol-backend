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
var EndPoints_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndPointsSchema = exports.EndPoints = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const endpoints_status_enum_1 = require("../enums/endpoints-status.enum");
const endpoints_type_enum_1 = require("../enums/endpoints-type.enum");
let EndPoints = EndPoints_1 = class EndPoints {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], EndPoints.prototype, "endpointPath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], EndPoints.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], EndPoints.prototype, "frequency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date, default: null }),
    __metadata("design:type", Date)
], EndPoints.prototype, "lastRun", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(endpoints_status_enum_1.EndPointsStatusEnum), default: endpoints_status_enum_1.EndPointsStatusEnum.stopped }),
    __metadata("design:type", String)
], EndPoints.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(endpoints_type_enum_1.EndPointsTypeEnum), }),
    __metadata("design:type", String)
], EndPoints.prototype, "endpointType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], EndPoints.prototype, "messageError", void 0);
EndPoints = EndPoints_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: EndPoints_1.name.toLowerCase() })
], EndPoints);
exports.EndPoints = EndPoints;
exports.EndPointsSchema = mongoose_1.SchemaFactory.createForClass(EndPoints);
//# sourceMappingURL=endpoints.schema.js.map