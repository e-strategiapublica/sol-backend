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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const project_repository_1 = require("../repositories/project.repository");
const user_repository_1 = require("../repositories/user.repository");
const agreement_repository_1 = require("../repositories/agreement.repository");
const agreement_active_status_1 = require("../enums/agreement-active-status");
const project_model_1 = require("../models/database/project.model");
const error_manager_1 = require("../../../shared/utils/error.manager");
let ProjectService = class ProjectService {
    constructor(_projectRepository, _userRepository, _agreementRepository, _projectModel) {
        this._projectRepository = _projectRepository;
        this._userRepository = _userRepository;
        this._agreementRepository = _agreementRepository;
        this._projectModel = _projectModel;
    }
    async findById(id) {
        const project = await this._projectRepository.findById(id);
        if (project.activeStatus === agreement_active_status_1.AgreementActiveStatusEnum.inactive)
            throw new Error("Project deleted");
        return project;
    }
    async deleteById(id) {
        return await this._projectRepository.deleteById(id);
    }
    async register(dto) {
        const res = await this._projectModel.getProjectByName(dto.name);
        if (res) {
            throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'Existing project name', 1);
        }
        const user = await this._userRepository.getById(dto.project_manager);
        if (!user || user.type !== 'project_manager')
            throw new Error("User not found or user is not a project manager");
        for (let i = 0; i < dto.agreement_list.length; i++) {
            await this._agreementRepository.addManager(dto.agreement_list[i], dto.project_manager);
        }
        const result = await this._projectRepository.register(dto);
        return result;
    }
    async findAll() {
        const result = await this._projectRepository.findAll();
        return result;
    }
    async findAllProjectsForAssociationId(associationId) {
        var _a;
        const result = [];
        const user = await this._userRepository.getById(associationId);
        const convenios = await this._agreementRepository.findForAssociation(user.association._id.toString());
        for (let i = 0; i < convenios.length; i++) {
            if (convenios[i].project) {
                result.push(await this._projectRepository.findById((_a = convenios[i].project) === null || _a === void 0 ? void 0 : _a._id.toString()));
            }
        }
        return result;
    }
    async findAllProjectsByReviewerId(reviewerId) {
        return await this._projectRepository.findAllProjectsByReviewerId(reviewerId);
    }
    async findAllProjectsByViewerId(reviewerId) {
        return await this._projectRepository.findAllProjectsByViewerId(reviewerId);
    }
    async findAllProjectsByManagerId(reviewerId) {
        return await this._projectRepository.findAllProjectsByManagerId(reviewerId);
    }
    async trueDelete(_id) {
        const result = await this._projectRepository.trueDelete(_id);
        return result;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository,
        user_repository_1.UserRepository,
        agreement_repository_1.AgreementRepository,
        project_model_1.ProjectModel])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map