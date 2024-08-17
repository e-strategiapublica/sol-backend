"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolModule = void 0;
const tutorial_repository_1 = require("./repositories/tutorial.repository");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const user_repository_1 = require("./repositories/user.repository");
const user_service_1 = require("./services/user.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const enviroment_variables_enum_1 = require("../../shared/enums/enviroment.variables.enum");
const jwt_strategy_1 = require("../../shared/strategies/jwt-strategy");
const authentication_service_1 = require("./services/authentication.service");
const authentication_controller_1 = require("./controllers/authentication.controller");
const security_service_1 = require("../../shared/services/security.service");
const user_controller_1 = require("./controllers/user.controller");
const tfa_repository_1 = require("./repositories/tfa.repository");
const tfa_controller_1 = require("./controllers/tfa.controller");
const tfa_service_1 = require("./services/tfa.service");
const verification_repository_1 = require("./repositories/verification.repository");
const verification_service_1 = require("./services/verification.service");
const email_service_1 = require("../../shared/services/email.service");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const axios_1 = require("@nestjs/axios");
const agreement_controller_1 = require("./controllers/agreement.controller");
const agreement_repository_1 = require("./repositories/agreement.repository");
const jwt_refresh_token_strategy_1 = require("../../shared/strategies/jwt-refresh-token-strategy");
const tutorial_controller_1 = require("./controllers/tutorial.controller");
const tutorial_service_1 = require("./services/tutorial.service");
const association_controller_1 = require("./controllers/association.controller");
const association_service_1 = require("./services/association.service");
const association_repository_1 = require("./repositories/association.repository");
const cost_items_controller_1 = require("./controllers/cost-items.controller");
const cost_items_service_1 = require("./services/cost-items.service");
const cost_items_repository_1 = require("./repositories/cost-items.repository");
const bid_controller_1 = require("./controllers/bid.controller");
const bid_service_1 = require("./services/bid.service");
const bid_repository_1 = require("./repositories/bid.repository");
const group_controller_1 = require("./controllers/group.controller");
const group_service_1 = require("./services/group.service");
const group_repository_1 = require("./repositories/group.repository");
const product_service_1 = require("./services/product.service");
const product_repository_1 = require("./repositories/product.repository");
const product_controller_1 = require("./controllers/product.controller");
const category_controller_1 = require("./controllers/category.controller");
const category_service_1 = require("./services/category.service");
const category_repository_1 = require("./repositories/category.repository");
const supplier_service_1 = require("./services/supplier.service");
const supplier_repository_1 = require("./repositories/supplier.repository");
const supplier_controller_1 = require("./controllers/supplier.controller");
const contract_controller_1 = require("./controllers/contract.controller");
const contract_service_1 = require("./services/contract.service");
const contract_repository_1 = require("./repositories/contract.repository");
const proposal_service_1 = require("./services/proposal.service");
const proposal_repository_1 = require("./repositories/proposal.repository");
const proposal_controller_1 = require("./controllers/proposal.controller");
const work_plan_repository_1 = require("./repositories/work-plan.repository");
const work_plan_service_1 = require("./services/work-plan.service");
const agreement_service_1 = require("./services/agreement.service");
const work_plan_controller_1 = require("./controllers/work-plan.controller");
const allotment_repository_1 = require("./repositories/allotment.repository");
const allotment_service_1 = require("./services/allotment.service");
const allotment_controller_1 = require("./controllers/allotment.controller");
const model_contract_repository_1 = require("./repositories/model-contract.repository");
const model_contract_controller_1 = require("./controllers/model-contract.controller");
const model_contract_service_1 = require("./services/model-contract.service");
const notification_controller_1 = require("./controllers/notification.controller");
const notification_service_1 = require("./services/notification.service");
const notification_repository_1 = require("./repositories/notification.repository");
const file_repository_1 = require("./repositories/file.repository");
const dashboard_service_1 = require("./services/dashboard.service");
const dashboard_controller_1 = require("./controllers/dashboard.controller");
const report_service_1 = require("./services/report.service");
const report_controller_1 = require("./controllers/report.controller");
const report_repository_1 = require("./repositories/report.repository");
const endpoints_service_1 = require("./services/endpoints.service");
const endpoints_repository_1 = require("./repositories/endpoints.repository");
const endpoints_controller_1 = require("./controllers/endpoints.controller");
const plataform_repository_1 = require("./repositories/plataform.repository");
const plataform_controller_1 = require("./controllers/plataform.controller");
const plataform_service_1 = require("./services/plataform.service");
const project_repository_1 = require("./repositories/project.repository");
const project_service_1 = require("./services/project.service");
const project_controller_1 = require("./controllers/project.controller");
const registry_repository_1 = require("./repositories/registry.repository");
const registry_service_1 = require("./services/registry.service");
const classes_controller_1 = require("./controllers/classes.controller");
const classes_service_1 = require("./services/classes.service");
const classes_model_1 = require("./models/database/classes.model");
const project_model_1 = require("./models/database/project.model");
const lacchain_model_1 = require("./models/blockchain/lacchain.model");
const association_model_1 = require("./models/database/association.model");
const bid_model_1 = require("./models/database/bid.model");
const bid_history_model_1 = require("./models/database/bid_history.model");
const pdm_controller_1 = require("./controllers/pdm.controller");
const pdm_service_1 = require("./services/pdm.service");
const pdm_model_1 = require("./models/database/pdm.model");
const items_controller_1 = require("./controllers/items.controller");
const items_service_1 = require("./services/items.service");
const items_model_1 = require("./models/database/items.model");
let SolModule = class SolModule {
};
SolModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({}),
            nestjs_sendgrid_1.SendGridModule.forRootAsync({
                imports: [
                    config_1.ConfigModule,
                ],
                useFactory: async (configService) => ({
                    apiKey: configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.SENDGRID_API_KEY),
                }),
                inject: [
                    config_1.ConfigService,
                ]
            }),
            database_module_1.DatabaseModule,
            axios_1.HttpModule,
        ],
        controllers: [
            authentication_controller_1.AuthenticationController,
            bid_controller_1.BidController,
            user_controller_1.UserController,
            tfa_controller_1.TfaController,
            agreement_controller_1.AgreementController,
            tutorial_controller_1.TutorialController,
            association_controller_1.AssociationController,
            cost_items_controller_1.CostItemsController,
            group_controller_1.GroupController,
            product_controller_1.ProductController,
            category_controller_1.CategoryController,
            supplier_controller_1.SupplierController,
            contract_controller_1.ContractController,
            model_contract_controller_1.ModelContractController,
            proposal_controller_1.ProposalController,
            agreement_controller_1.AgreementController,
            work_plan_controller_1.WorkPlanController,
            allotment_controller_1.AllotmentController,
            notification_controller_1.NotificationtController,
            dashboard_controller_1.DashboardController,
            report_controller_1.ReportController,
            endpoints_controller_1.EndPointsController,
            plataform_controller_1.PlataformController,
            project_controller_1.ProjectController,
            classes_controller_1.ClassesController,
            pdm_controller_1.PdmController,
            items_controller_1.ItemsController,
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_token_strategy_1.RefreshTokenStrategy,
            user_repository_1.UserRepository,
            tfa_repository_1.TfaRepository,
            verification_repository_1.VerificationRepository,
            tutorial_repository_1.TutorialRepository,
            authentication_service_1.AuthenticationService,
            user_service_1.UserService,
            security_service_1.SecurityService,
            tfa_service_1.TfaService,
            verification_service_1.VerificationService,
            email_service_1.EmailService,
            tutorial_service_1.TutorialService,
            classes_service_1.ClassesService,
            pdm_service_1.PdmService,
            items_service_1.ItemsService,
            association_service_1.AssociationService,
            association_repository_1.AssociationRepository,
            cost_items_service_1.CostItemsService,
            cost_items_repository_1.CostItemsRepository,
            bid_service_1.BidService,
            bid_repository_1.BidRepository,
            group_service_1.GroupService,
            group_repository_1.GroupRepository,
            product_service_1.ProductService,
            product_repository_1.ProductRepository,
            category_service_1.CategoryService,
            category_repository_1.CategoryRepository,
            supplier_service_1.SupplierService,
            supplier_repository_1.SupplierRepository,
            contract_service_1.ContractService,
            model_contract_service_1.ModelContractService,
            contract_repository_1.ContractRepository,
            proposal_service_1.ProposalService,
            proposal_repository_1.ProposalRepository,
            work_plan_repository_1.WorkPlanRepository,
            work_plan_service_1.WorkPlanService,
            contract_repository_1.ContractRepository,
            model_contract_repository_1.ModelContractRepository,
            agreement_service_1.AgreementService,
            agreement_repository_1.AgreementRepository,
            allotment_service_1.AllotmentService,
            allotment_repository_1.AllotmentRepository,
            notification_service_1.NotificationService,
            notification_repository_1.NotificationRepository,
            file_repository_1.FileRepository,
            dashboard_service_1.DashboardService,
            report_service_1.ReportService,
            report_repository_1.ReportRepository,
            endpoints_service_1.EndPointsService,
            endpoints_repository_1.EndPointsRepository,
            plataform_service_1.PlataformService,
            plataform_repository_1.PlataformRepository,
            project_repository_1.ProjectRepository,
            project_service_1.ProjectService,
            registry_repository_1.RegistryRepository,
            registry_service_1.RegistryService,
            classes_model_1.ClassesModel,
            association_model_1.MyAssociationModel,
            pdm_model_1.PdmModel,
            items_model_1.ItemsModel,
            lacchain_model_1.LacchainModel,
            bid_model_1.MyBidModel,
            project_model_1.ProjectModel,
            bid_history_model_1.BidHistoryModel
        ],
        exports: [
            authentication_service_1.AuthenticationService,
            user_service_1.UserService,
            user_repository_1.UserRepository,
            association_service_1.AssociationService,
        ]
    })
], SolModule);
exports.SolModule = SolModule;
//# sourceMappingURL=sol.module.js.map