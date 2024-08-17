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
var ReportController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../shared/guards/jwt-auth.guard");
const response_dto_1 = require("../../../shared/dtos/response.dto");
const report_service_1 = require("../services/report.service");
const fs = require("fs-extra");
const path = require("path");
let ReportController = ReportController_1 = class ReportController {
    constructor(_reportService) {
        this._reportService = _reportService;
        this._logger = new common_1.Logger(ReportController_1.name);
    }
    async get() {
        try {
            const response = await this._reportService.getDataContract();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getReportGenerated() {
        try {
            const response = await this._reportService.getReportGenerated();
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
            throw new common_1.HttpException(new response_dto_1.ResponseDto(false, null, [error.message]), common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async generateExcel(res, type, request) {
        try {
            const payload = request.user;
            const filePath = await this._reportService.getSpreadsheet(type, payload.userId);
            const absolutePath = path.resolve(filePath);
            res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
            res.sendFile(absolutePath, {}, (err) => {
                if (err) {
                    throw err;
                }
                fs.unlinkSync(filePath);
            });
        }
        catch (error) {
            throw new common_1.HttpException({
                message: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async donwloadArchive(_id) {
        try {
            const response = await this._reportService.downloadReportGeneratedById(_id);
            return new response_dto_1.ResponseDto(true, response, null);
        }
        catch (error) {
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
], ReportController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('report-generated'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportGenerated", null);
__decorate([
    (0, common_1.Get)('download-data/:type'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "generateExcel", null);
__decorate([
    (0, common_1.Get)('download-report/:_id'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "donwloadArchive", null);
ReportController = ReportController_1 = __decorate([
    (0, swagger_1.ApiTags)("report"),
    (0, common_1.Controller)("report"),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map