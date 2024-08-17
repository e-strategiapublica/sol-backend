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
var ModelContract_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelContractSchema = exports.ModelContract = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const model_contract_status_enum_1 = require("../enums/model-contract-status.enum");
const language_contract_enum_1 = require("../enums/language-contract.enum");
const modelContract_classification_enum_1 = require("../enums/modelContract-classification.enum");
let ModelContract = ModelContract_1 = class ModelContract {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], ModelContract.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: Object.keys(model_contract_status_enum_1.ModelContractStatusEnum), default: model_contract_status_enum_1.ModelContractStatusEnum.ativo }),
    __metadata("design:type", String)
], ModelContract.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Object.values(modelContract_classification_enum_1.ModelContractClassificationEnum) }),
    __metadata("design:type", String)
], ModelContract.prototype, "classification", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], ModelContract.prototype, "contract", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: Object.keys(language_contract_enum_1.LanguageContractEnum), default: language_contract_enum_1.LanguageContractEnum.portuguese }),
    __metadata("design:type", String)
], ModelContract.prototype, "language", void 0);
ModelContract = ModelContract_1 = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: ModelContract_1.name.toLowerCase() })
], ModelContract);
exports.ModelContract = ModelContract;
exports.ModelContractSchema = mongoose_1.SchemaFactory.createForClass(ModelContract);
//# sourceMappingURL=model-contract.schemay.js.map