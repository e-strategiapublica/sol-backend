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
var SupplierController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const supplier_service_1 = require("../services/supplier.service");
const supplier_register_request_dto_1 = require("../dtos/supplier-register-request.dto");
const supplier_update_status_request_dto_1 = require("../dtos/supplier-update-status-request.dto");
const supplier_group_id_update_dto_1 = require("../dtos/supplier-group-id-update.dto");
const funcoes_guard_1 = require("../../../shared/guards/funcoes.guard");
const function_decorator_1 = require("../../../shared/decorators/function.decorator");
const user_type_enum_1 = require("../enums/user-type.enum");
const supplier_register_block_request_dt_1 = require("../dtos/supplier-register-block-request.dt");
const user_service_1 = require("../services/user.service");
const user_roles_enum_1 = require("../enums/user-roles.enum");
const user_status_enum_1 = require("../enums/user-status.enum");
let SupplierController = SupplierController_1 = class SupplierController {
    constructor(supplierService, userService) {
        this.supplierService = supplierService;
        this.userService = userService;
        this.logger = new common_1.Logger(SupplierController_1.name);
    }
    async register(dto) {
        try {
            const response = await this.supplierService.register(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async registerWithoutAuth(dto) {
        var _a, _b, _c;
        try {
            let response = await this.supplierService.register(dto);
            if (dto.legal_representative.email && dto.legal_representative.phone) {
                try {
                    const dto_user = {
                        name: dto.legal_representative.name,
                        phone: dto.legal_representative.phone,
                        email: dto.legal_representative.email,
                        document: dto.legal_representative.cpf,
                        type: user_type_enum_1.UserTypeEnum.fornecedor,
                        roles: user_roles_enum_1.UserRolesEnum.geral,
                        status: user_status_enum_1.UserStatusEnum.active,
                        association: null,
                        office: null,
                        supplier: response._id
                    };
                    response['supplier_user'] = await this.userService.register(dto_user);
                }
                catch (error) {
                    this.logger.error(error.message);
                    this.supplierService.deleteById(response._id);
                    throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
                }
            }
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            if ((_a = error.response) === null || _a === void 0 ? void 0 : _a.errors) {
                throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [(_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.errors) === null || _c === void 0 ? void 0 : _c.pop()]), common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async list() {
        try {
            const response = await this.supplierService.list();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async listWithoutAuth() {
        try {
            const response = await this.supplierService.list();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getById(_id) {
        try {
            const response = await this.supplierService.listById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateById(_id, dto) {
        try {
            const response = await this.supplierService.update(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateStatusById(_id, dto) {
        try {
            const response = await this.supplierService.updateStatus(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateGroupById(_id, dto) {
        try {
            const response = await this.supplierService.updateGroup(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async block(_id, dto) {
        try {
            const response = await this.supplierService.block(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async unblock(_id, dto) {
        try {
            const response = await this.supplierService.unblock(_id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this.logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteById(_id) {
        try {
            const result = await this.supplierService.deleteById(_id);
            return new response_dto_1.ResponseDto(true, result, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplier_register_request_dto_1.SupplierRegisterDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('registerWithoutAuth'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [supplier_register_request_dto_1.SupplierRegisterDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "registerWithoutAuth", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('listWithoutAuth'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "listWithoutAuth", null);
__decorate([
    (0, common_1.Get)('get-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)('update/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_register_request_dto_1.SupplierRegisterDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "updateById", null);
__decorate([
    (0, common_1.Put)('update-status/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_update_status_request_dto_1.SupplierUpdateStatusDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "updateStatusById", null);
__decorate([
    (0, common_1.Put)('update-group/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_group_id_update_dto_1.SupplierGroupIdUpdateDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "updateGroupById", null);
__decorate([
    (0, common_1.Put)('block/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_register_block_request_dt_1.SupplierRegisterBlockRequestDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "block", null);
__decorate([
    (0, common_1.Put)('unblock/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, funcoes_guard_1.FuncoesGuard),
    (0, function_decorator_1.Funcoes)(user_type_enum_1.UserTypeEnum.administrador),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, supplier_register_block_request_dt_1.SupplierRegisterBlockRequestDto]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "unblock", null);
__decorate([
    (0, common_1.Delete)('delete-by-id/:_id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplierController.prototype, "deleteById", null);
SupplierController = SupplierController_1 = __decorate([
    (0, swagger_1.ApiTags)('supplier'),
    (0, common_1.Controller)('supplier'),
    __metadata("design:paramtypes", [supplier_service_1.SupplierService,
        user_service_1.UserService])
], SupplierController);
exports.SupplierController = SupplierController;
//# sourceMappingURL=supplier.controller.js.map