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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_register_response_dto_1 = require("../dtos/user-register-response.dto");
const user_status_enum_1 = require("../enums/user-status.enum");
const user_repository_1 = require("../repositories/user.repository");
const bcrypt = require("bcryptjs");
const user_update_response_dto_1 = require("../dtos/user-update-response.dto");
const user_get_response_dto_1 = require("../dtos/user-get-response.dto");
const verification_service_1 = require("./verification.service");
const user_update_profile_picture_response_dto_1 = require("../dtos/user-update-profile-picture-response.dto");
const user_list_by_type_response_dto_1 = require("../dtos/user-list-by-type-response.dto");
const supplier_service_1 = require("./supplier.service");
const association_service_1 = require("./association.service");
let UserService = class UserService {
    constructor(_userRepository, _supplierService, _associationService, _verificationService) {
        this._userRepository = _userRepository;
        this._supplierService = _supplierService;
        this._associationService = _associationService;
        this._verificationService = _verificationService;
    }
    async getById(_id) {
        const result = await this._userRepository.getById(_id);
        return new user_get_response_dto_1.UserGetResponseDto(result._id, result.name, result.email, result.phone, result.status, result.document, result.profilePicture, result.office, result.association, result.supplier, result.roles, result.notification_list);
    }
    async getUserBySupplierId(_id) {
        const result = await this._userRepository.getUserBySupplierId(_id);
        return result;
    }
    async getByIdInternal(_id) {
        return await this._userRepository.getById(_id);
    }
    async getAll() {
        return await this._userRepository.getAll();
    }
    async getByEmail(email) {
        const result = await this._userRepository.getByEmail(email);
        if (!result)
            throw new common_1.BadRequestException('Email não encontrado!');
        return new user_get_response_dto_1.UserGetResponseDto(result._id, result.name, result.email, result.phone, result.status, result.document);
    }
    async getByEmailFirstAccess(email) {
        const result = await this._userRepository.getByEmail(email);
        if (!result)
            throw new common_1.BadRequestException('Email não encontrado!');
        if (result.status == user_status_enum_1.UserStatusEnum.active)
            throw new common_1.BadRequestException('Você já realizou o primeiro acesso!');
        return new user_get_response_dto_1.UserGetResponseDto(result._id, result.name, result.email, result.phone, result.status, result.document);
    }
    async register(dto) {
        if (dto.document) {
            const userByDocument = await this._userRepository.getByDocument(dto.document);
            if (userByDocument) {
                throw new common_1.BadRequestException('Esse CPF/CNPJ ja foi cadastrado!');
            }
        }
        if (dto.supplier) {
            const userBySupplier = await this._supplierService.listById(dto.supplier);
            if (!userBySupplier) {
                throw new common_1.BadRequestException('Esse fornecedor não existe!');
            }
            dto.supplier = userBySupplier;
        }
        if (dto.association) {
            const userByAssociation = await this._associationService.getById(dto.association);
            if (!userByAssociation) {
                throw new common_1.BadRequestException('Essa associação não existe!');
            }
            dto.association = userByAssociation;
        }
        dto.status = user_status_enum_1.UserStatusEnum.inactive;
        const result = await this._userRepository.register(dto);
        if (!result)
            throw new common_1.BadRequestException('Email já existente na plataforma!');
        return new user_register_response_dto_1.UserRegisterResponseDto(result._id, result.email);
    }
    async update(_id, dto) {
        const result = await this._userRepository.update(_id, dto);
        return new user_update_response_dto_1.UserUpdateResponseDto(_id, result.email, result.name);
    }
    async updateById(_id, dto) {
        const result = await this._userRepository.updateById(_id, dto);
        return new user_update_response_dto_1.UserUpdateResponseDto(_id, result.email);
    }
    async updatePassword(_id, dto) {
        const user = await this._userRepository.getById(_id);
        if (!user)
            throw new common_1.BadRequestException('user not found!');
        if (!(await bcrypt.compare(dto.password, user.password)))
            throw new common_1.BadRequestException('wrong password!');
        dto.password = await bcrypt.hash(dto.newPassword, 13);
        const result = await this._userRepository.updatePassword(_id, dto);
        return new user_update_response_dto_1.UserUpdateResponseDto(_id, result.email);
    }
    async registerPassword(_id, dto) {
        const user = await this._userRepository.getById(_id);
        dto.status = user_status_enum_1.UserStatusEnum.active;
        if (!user)
            throw new common_1.BadRequestException('user not found!');
        dto.password = await bcrypt.hash(dto.password, 13);
        const result = await this._userRepository.registerPassword(_id, dto);
        return new user_update_response_dto_1.UserUpdateResponseDto(_id, result.email);
    }
    async updatePasswordWithCode(dto) {
        const userModel = await this._userRepository.getByEmail(dto.email);
        await this._verificationService.verifyCode(userModel, dto.code);
        const password = await bcrypt.hash(dto.newPassword, 13);
        await this._userRepository.updatePassword(userModel._id, {
            password: password,
            newPassword: '',
        });
        if (userModel.status == user_status_enum_1.UserStatusEnum.inactive) {
            await this._userRepository.updateStatus(userModel._id, user_status_enum_1.UserStatusEnum.active);
        }
        return new user_update_response_dto_1.UserUpdateResponseDto(userModel._id, userModel.email);
    }
    async updateProfilePicture(_id, profilePicture) {
        const userModel = await this._userRepository.updateProfilePicture(_id, profilePicture);
        return new user_update_profile_picture_response_dto_1.UserUpdateProfilePictureResponseDto(userModel.profilePicture);
    }
    async listByType(type) {
        var _a;
        const list = await this._userRepository.listByType(type);
        let response = [];
        for (const iterator of list) {
            response.push(new user_list_by_type_response_dto_1.UserListByTypeResponseDto(iterator._id, iterator.name, iterator.email, iterator.status, iterator.type, iterator.profilePicture, iterator.phone, iterator.document, iterator.office, iterator.association, (_a = iterator === null || iterator === void 0 ? void 0 : iterator.supplier) === null || _a === void 0 ? void 0 : _a._id.toString(), iterator.roles));
        }
        return response;
    }
    async listByRole(role) {
        const list = await this._userRepository.listByRole(role);
        return list;
    }
    async deleteById(_id) {
        return await this._userRepository.deleteById(_id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        supplier_service_1.SupplierService,
        association_service_1.AssociationService,
        verification_service_1.VerificationService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map