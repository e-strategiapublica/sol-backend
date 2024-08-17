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
var AssociationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociationService = void 0;
const common_1 = require("@nestjs/common");
const association_repository_1 = require("../repositories/association.repository");
const marital_status_enum_1 = require("../enums/marital-status.enum");
const user_roles_enum_1 = require("../enums/user-roles.enum");
const user_status_enum_1 = require("../enums/user-status.enum");
const user_type_enum_1 = require("../enums/user-type.enum");
const user_repository_1 = require("../repositories/user.repository");
const association_model_1 = require("../models/database/association.model");
const error_manager_1 = require("../../../shared/utils/error.manager");
let AssociationService = AssociationService_1 = class AssociationService {
    constructor(_associationRepository, _userRepository, _associationModel) {
        this._associationRepository = _associationRepository;
        this._userRepository = _userRepository;
        this._associationModel = _associationModel;
        this._logger = new common_1.Logger(AssociationService_1.name);
    }
    async register(dto) {
        try {
            const res = await this._associationModel.getAssociation(dto.name, dto.cnpj);
            if (res) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'The association exists', 1);
            }
            const result = await this._associationRepository.register(dto);
            if (!result)
                throw new common_1.BadRequestException("Não foi possivel criar a associação!");
            return result;
        }
        catch (e) {
            throw error_manager_1.ErrorManager.createError(e);
        }
    }
    async registerFromIntegration(dto) {
        try {
            const res = await this._associationModel.getAssociation(dto.name, dto.cnpj);
            if (res) {
                return { type: "error" };
            }
            const result = await this._associationRepository.register(dto);
            return result;
        }
        catch (e) {
            throw error_manager_1.ErrorManager.createError(e);
        }
    }
    async update(_id, dto) {
        const item = await this._associationRepository.getById(_id);
        if (!item) {
            throw new common_1.BadRequestException("Associação não encontrada!");
        }
        const result = await this._associationRepository.update(_id, dto);
        return result;
    }
    async list() {
        const result = await this._associationRepository.list();
        return result;
    }
    async getById(_id) {
        const result = await this._associationRepository.getById(_id);
        if (!result) {
            throw new common_1.BadRequestException("Associação não encontrada!");
        }
        return result;
    }
    async deleteById(_id) {
        return await this._associationRepository.deleteById(_id);
    }
    async getByCnpj(cnpj) {
        return await this._associationRepository.getByCnpj(cnpj);
    }
    async handlerJob(data) {
        const now = new Date();
        for (let item of data) {
            const result = await this.registerFromIntegration({
                address: {
                    city: '-',
                    complement: item.address.complement || "",
                    latitude: (item.address.latitude || "").toString(),
                    longitude: (item.address.longitude || "").toString(),
                    neighborhood: item.address.neighborhood || "",
                    number: item.address.number || "",
                    zipCode: item.address.cep || "",
                    publicPlace: item.address.address || "",
                    referencePoint: item.address.reference_point || "",
                    state: "-",
                },
                cnpj: item.cnpj || "",
                name: item.name || "",
                legalRepresentative: {
                    address: {
                        city: item.legal_representative.address.city_code || "",
                        complement: item.legal_representative.address.complement || "",
                        latitude: (item.legal_representative.address.latitude || "").toString(),
                        longitude: (item.legal_representative.address.longitude || "").toString(),
                        neighborhood: item.legal_representative.address.neighborhood || "",
                        number: (item.legal_representative.address.number || 0).toString(),
                        zipCode: item.legal_representative.address.cep || "",
                        publicPlace: item.legal_representative.address.address || "",
                        referencePoint: item.legal_representative.address.reference_point || "",
                        state: "-",
                    },
                    cpf: item.legal_representative.cpf || "",
                    maritalStatus: marital_status_enum_1.MaritalStatusEnum.solteiro,
                    name: item.legal_representative.name || "",
                    nationality: item.legal_representative.nationality || "",
                    rg: item.legal_representative.rg || "",
                    document_origin: item.legal_representative.document_origin || "",
                    validityData: now,
                },
            });
            if (result['type'] == "error") {
                item.users.forEach(async (user) => {
                    await this._userRepository.register({
                        association: result,
                        document: user.cpf,
                        email: user.email,
                        name: user.name,
                        office: user.role,
                        phone: user.phone,
                        roles: user_roles_enum_1.UserRolesEnum.geral,
                        status: user_status_enum_1.UserStatusEnum.inactive,
                        type: user_type_enum_1.UserTypeEnum.associacao,
                    });
                });
            }
        }
    }
};
AssociationService = AssociationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [association_repository_1.AssociationRepository,
        user_repository_1.UserRepository,
        association_model_1.MyAssociationModel])
], AssociationService);
exports.AssociationService = AssociationService;
//# sourceMappingURL=association.service.js.map