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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationRepository = void 0;
const common_1 = require("@nestjs/common");
const association_schema_1 = require("../schemas/association.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const association_status_enum_1 = require("../enums/association-status.enum");
let AssociationRepository = class AssociationRepository {
    constructor(_model) {
        this._model = _model;
    }
    async register(dto) {
        const data = await new this._model(dto);
        return data.save();
    }
    async update(_id, dto) {
        var _a, _b;
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                cnpj: dto.cnpj,
                name: dto.name,
                'address.zipCode': dto.address.zipCode,
                'address.publicPlace': dto.address.publicPlace,
                'address.neighborhood': dto.address.neighborhood,
                'address.city': dto.address.city,
                'address.state': dto.address.state,
                'address.latitude': dto.address.latitude,
                'address.longitude': dto.address.longitude,
                'address.complement': dto.address.complement,
                'address.referencePoint': dto.address.referencePoint,
                'address.number': (_a = dto.address.number) !== null && _a !== void 0 ? _a : 'S/N',
                'legalRepresentative.name': dto.legalRepresentative.name,
                'legalRepresentative.nationality': dto.legalRepresentative.nationality,
                'legalRepresentative.maritalStatus': dto.legalRepresentative.maritalStatus,
                'legalRepresentative.cpf': dto.legalRepresentative.cpf,
                'legalRepresentative.rg': dto.legalRepresentative.rg,
                'legalRepresentative.document_origin': dto.legalRepresentative.document_origin,
                'legalRepresentative.validityData': dto.legalRepresentative.validityData,
                'legalRepresentative.address.zipCode': dto.legalRepresentative.address.zipCode,
                'legalRepresentative.address.publicPlace': dto.legalRepresentative.address.publicPlace,
                'legalRepresentative.address.neighborhood': dto.legalRepresentative.address.neighborhood,
                'legalRepresentative.address.city': dto.legalRepresentative.address.city,
                'legalRepresentative.address.state': dto.legalRepresentative.address.state,
                'legalRepresentative.address.latitude': dto.legalRepresentative.address.latitude,
                'legalRepresentative.address.longitude': dto.legalRepresentative.address.longitude,
                'legalRepresentative.address.complement': dto.legalRepresentative.address.complement,
                'legalRepresentative.address.referencePoint': dto.legalRepresentative.address.referencePoint,
                'legalRepresentative.address.number': (_b = dto.legalRepresentative.address.number) !== null && _b !== void 0 ? _b : 'S/N'
            }
        });
    }
    async list() {
        return await this._model.find({ status: association_status_enum_1.AssociationStatusEnum.active });
    }
    async getById(_id) {
        const result = await this._model.findOne({ _id });
        return result;
    }
    async deleteById(_id) {
        return await this._model.findOneAndUpdate({ _id }, { $set: { status: association_status_enum_1.AssociationStatusEnum.inactive } });
    }
    async getByCnpj(cnpj) {
        return await this._model.findOne({ cnpj: cnpj, status: association_status_enum_1.AssociationStatusEnum.active });
    }
};
AssociationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(association_schema_1.Association.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssociationRepository);
exports.AssociationRepository = AssociationRepository;
//# sourceMappingURL=association.repository.js.map