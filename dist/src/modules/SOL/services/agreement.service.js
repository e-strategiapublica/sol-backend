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
exports.AgreementService = void 0;
const common_1 = require("@nestjs/common");
const agreement_repository_1 = require("../repositories/agreement.repository");
const user_repository_1 = require("../repositories/user.repository");
const work_plan_service_1 = require("./work-plan.service");
const association_service_1 = require("../services/association.service");
const agreement_status_enum_1 = require("../enums/agreement-status.enum");
const cost_items_service_1 = require("./cost-items.service");
const items_model_1 = require("../models/database/items.model");
const project_repository_1 = require("../repositories/project.repository");
const user_roles_enum_1 = require("../enums/user-roles.enum");
let AgreementService = class AgreementService {
    constructor(_agreementRepository, _userRepository, _workPlanService, _associationService, _costItemsService, itemsModel, _projectRepository) {
        this._agreementRepository = _agreementRepository;
        this._userRepository = _userRepository;
        this._workPlanService = _workPlanService;
        this._associationService = _associationService;
        this._costItemsService = _costItemsService;
        this.itemsModel = itemsModel;
        this._projectRepository = _projectRepository;
    }
    async findById(id) {
        return await this._agreementRepository.findById(id);
    }
    async findAgreementByUserId(id, userRole) {
        const project = [];
        if (userRole === user_roles_enum_1.UserRolesEnum.gerente_geral_projetos) {
            return await this._agreementRepository.findForGerenteGeralProjetos(id);
        }
        else {
            project.push(...await this._projectRepository.findAllProjectsByViewerId(id));
        }
        const result = [];
        for (let i = 0; i < project.length; i++) {
            const item = await this._agreementRepository.findByProjectId(project[i]._id.toString());
            result.push(...item);
        }
        return result;
    }
    async findAgreementByReviewerOrManagerId(id) {
        return await this._agreementRepository.findAgreementByReviewerOrManagerId(id);
    }
    async findAgreementByReviewerId(id) {
        return await this._agreementRepository.findAgreementByReviewerId(id);
    }
    async findAgreementByManagerId(id) {
        return await this._agreementRepository.findAgreementByManagerId(id);
    }
    async findAgreementByProjectrId(id) {
        return await this._agreementRepository.findAgreementByProjectId(id);
    }
    async deleteById(id) {
        return await this._agreementRepository.deleteById(id);
    }
    async register(dto) {
        const project = await this._projectRepository.findById(dto.projectId);
        if (!project)
            throw new Error("Project not found");
        dto.project = project;
        const association = await this._associationService.getById(dto.associationId);
        if (!association)
            throw new Error("Association not found");
        dto.association = association;
        const result = await this._agreementRepository.register(dto);
        return result;
    }
    async findAll() {
        const result = await this._agreementRepository.findAll();
        return result;
    }
    async findAgreementsWithOutProject() {
        const idList = [];
        const projects = await this._projectRepository.findAll();
        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < projects[i].agreement_list.length; j++) {
                idList.push(projects[i].agreement_list[j]._id);
            }
        }
        const result = await this._agreementRepository.findAgreementsWithOutProject(idList);
        return result;
    }
    async findForAssociation(associationId) {
        var _a;
        const user = await this._userRepository.getById(associationId);
        const idList = [];
        const result = await this._agreementRepository.findForAssociation((_a = user.association) === null || _a === void 0 ? void 0 : _a._id.toString());
        return result;
    }
    async getAgreementsWithProjects() {
        const idList = [];
        const projects = await this._projectRepository.findAll();
        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < projects[i].agreement_list.length; j++) {
                idList.push(projects[i].agreement_list[j]._id);
            }
        }
        const result = await this._agreementRepository.findAgreementsWithProject(idList);
        return result;
    }
    async update(id, dto) {
        dto.project = await this._projectRepository.findById(dto.projectId);
        if (!dto.project)
            throw new Error("User not found");
        dto.association = await this._associationService.getById(dto.associationId);
        if (!dto.association)
            throw new Error("Association not found");
        return await this._agreementRepository.update(id, dto);
    }
    async addWorkPlan(id, workPlanIds) {
        var _a;
        const agreement = await this._agreementRepository.findById(id);
        if (!agreement.workPlan)
            agreement.workPlan = [];
        if (agreement.workPlan.some(item => item._id.toString() === workPlanIds))
            return agreement;
        const works = await this._workPlanService.listByIds([
            workPlanIds,
            ...(_a = agreement.workPlan) === null || _a === void 0 ? void 0 : _a.map(item => item._id.toString()),
        ]);
        agreement.workPlan = works;
        return await this._agreementRepository.update(agreement._id, agreement);
    }
    async removeWorkPlan(id, workPlanId) {
        const agreement = await this._agreementRepository.findById(id);
        agreement.workPlan = agreement.workPlan.filter(item => item._id.toString() !== workPlanId);
        await this._workPlanService.deleteById(workPlanId);
        return await this._agreementRepository.update(id, agreement);
    }
    async handlerJob(data) {
        const costItemsAll = await this.itemsModel.list();
        data.forEach(async (item) => {
            const association = await this._associationService.getByCnpj(item.covenant_cnpj);
            const reviewer = await this._projectRepository.findByEmail(item.admin.email);
            if (!association || !reviewer)
                return;
            const signature_date = new Date(item.signature_date || "");
            const validity_date = new Date(item.validity_date || "");
            const agreement = await this._agreementRepository.register({
                association: association,
                project: reviewer,
                city: item.city_code,
                status: agreement_status_enum_1.AgreementStatusEnum.inExecution,
                register_number: item.number,
                signature_date: signature_date,
                value: item.estimated_cost,
                register_object: item.name,
                validity_date: validity_date,
                states: "-",
                associationId: association._id.toString(),
                projectId: reviewer._id.toString(),
                manager: reviewer._id.toString(),
                reviewer: reviewer._id.toString(),
            });
            item.groups.forEach(async (group) => {
                let products = [];
                group.group_items.forEach(async (produtcs) => {
                    const costItems = await this.itemsModel.saveItem({
                        group: {
                            _id: costItemsAll[0].group._id,
                            category_name: costItemsAll[0].group.category_name,
                            code: costItemsAll[0].group.code,
                            segment: costItemsAll[0].group.segment
                        },
                        class: {
                            _id: costItemsAll[0].class._id,
                            code: costItemsAll[0].class.code,
                            description: costItemsAll[0].class.description
                        },
                        pdm: {
                            _id: costItemsAll[0].pdm._id,
                            code: costItemsAll[0].pdm.code,
                            name: costItemsAll[0].pdm.name,
                            unitList: [produtcs.unit]
                        },
                        code: produtcs.code,
                        name: produtcs.title,
                        propertyListValue: [
                            { property: 'Generic', value: produtcs.quantity }
                        ]
                    });
                    products.push({
                        quantity: produtcs.quantity,
                        unitValue: produtcs.estimated_cost,
                        items: costItems,
                    });
                });
                const workPlan = await this._workPlanService.registerFromIntegration({
                    name: group.name,
                    product: products,
                });
                await this.addWorkPlan(agreement._id.toString(), workPlan._id.toString());
            });
        });
    }
};
AgreementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [agreement_repository_1.AgreementRepository,
        user_repository_1.UserRepository,
        work_plan_service_1.WorkPlanService,
        association_service_1.AssociationService,
        cost_items_service_1.CostItemsService,
        items_model_1.ItemsModel,
        project_repository_1.ProjectRepository])
], AgreementService);
exports.AgreementService = AgreementService;
//# sourceMappingURL=agreement.service.js.map