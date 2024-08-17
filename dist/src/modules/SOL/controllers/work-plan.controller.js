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
var WorkPlanController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkPlanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const work_plan_service_1 = require("../services/work-plan.service");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const work_plan_register_request_dto_1 = require("../dtos/work-plan-register-request.dto");
let WorkPlanController = WorkPlanController_1 = class WorkPlanController {
    constructor(_workPlanService) {
        this._workPlanService = _workPlanService;
        this._logger = new common_1.Logger(WorkPlanController_1.name);
    }
    async list() {
        try {
            const response = await this._workPlanService.findAll();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findById(id) {
        try {
            const response = await this._workPlanService.findById(id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async register(dto) {
        try {
            const response = await this._workPlanService.register(dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, dto) {
        try {
            const response = await this._workPlanService.update(id, dto);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            this._logger.error(error.message);
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkPlanController.prototype, "list", null);
__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkPlanController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorkPlanController.prototype, "register", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_plan_register_request_dto_1.WorkPlanRegisterRequestDto]),
    __metadata("design:returntype", Promise)
], WorkPlanController.prototype, "update", null);
WorkPlanController = WorkPlanController_1 = __decorate([
    (0, swagger_1.ApiTags)("workplan"),
    (0, common_1.Controller)("workplan"),
    __metadata("design:paramtypes", [work_plan_service_1.WorkPlanService])
], WorkPlanController);
exports.WorkPlanController = WorkPlanController;
//# sourceMappingURL=work-plan.controller.js.map