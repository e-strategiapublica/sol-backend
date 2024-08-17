"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const tutorial_schema_1 = require("../SOL/schemas/tutorial.schema");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const enviroment_variables_enum_1 = require("../../shared/enums/enviroment.variables.enum");
const agreement_schema_1 = require("../SOL/schemas/agreement.schema");
const tfa_schema_1 = require("../SOL/schemas/tfa-schema");
const user_schema_1 = require("../SOL/schemas/user.schema");
const verification_schema_1 = require("../SOL/schemas/verification.schema");
const association_schema_1 = require("../SOL/schemas/association.schema");
const cost_items_schema_1 = require("../SOL/schemas/cost-items.schema");
const bids_schema_1 = require("../SOL/schemas/bids.schema");
const group_schema_1 = require("../SOL/schemas/group.schema");
const product_schema_1 = require("../SOL/schemas/product.schema");
const category_schema_1 = require("../SOL/schemas/category.schema");
const supplier_schema_1 = require("../SOL/schemas/supplier.schema");
const ethers_1 = require("ethers");
const contract_schema_1 = require("../SOL/schemas/contract.schema");
const proposal_schema_1 = require("../SOL/schemas/proposal.schema");
const work_plan_schema_1 = require("../SOL/schemas/work-plan.schema");
const allotment_schema_1 = require("../SOL/schemas/allotment.schema");
const model_contract_schemay_1 = require("../SOL/schemas/model-contract.schemay");
const notification_schema_1 = require("../SOL/schemas/notification.schema");
const report_generated_schema_1 = require("../SOL/schemas/report-generated.schema");
const endpoints_schema_1 = require("../SOL/schemas/endpoints.schema");
const plataform_schema_1 = require("../SOL/schemas/plataform.schema");
const project_schema_1 = require("../SOL/schemas/project.schema");
const registry_schema_1 = require("../SOL/schemas/registry.schema");
const items_schema_1 = require("../SOL/schemas/items.schema");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.NOSQL_CONNECTION_STRING),
                    useNewUrlParser: true,
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: tfa_schema_1.Tfa.name, schema: tfa_schema_1.TfaSchema },
                { name: verification_schema_1.Verification.name, schema: verification_schema_1.VerificationSchema },
                { name: agreement_schema_1.Agreement.name, schema: agreement_schema_1.AgreementSchema },
                { name: tutorial_schema_1.Tutorial.name, schema: tutorial_schema_1.TutorialSchema },
                { name: association_schema_1.Association.name, schema: association_schema_1.AssociationSchema },
                { name: cost_items_schema_1.CostItems.name, schema: cost_items_schema_1.CostItemsSchema },
                { name: items_schema_1.Items.name, schema: items_schema_1.ItemsSchema },
                { name: bids_schema_1.Bids.name, schema: bids_schema_1.BidsSchema },
                { name: group_schema_1.Group.name, schema: group_schema_1.GroupSchema },
                { name: product_schema_1.Products.name, schema: product_schema_1.ProductsSchema },
                { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
                { name: supplier_schema_1.Supplier.name, schema: supplier_schema_1.SupplierSchema },
                { name: ethers_1.Contract.name, schema: contract_schema_1.ContractSchema },
                { name: model_contract_schemay_1.ModelContract.name, schema: model_contract_schemay_1.ModelContractSchema },
                { name: proposal_schema_1.Proposal.name, schema: proposal_schema_1.ProposaltSchema },
                { name: work_plan_schema_1.WorkPlan.name, schema: work_plan_schema_1.WorkPlanSchema },
                { name: allotment_schema_1.Allotment.name, schema: allotment_schema_1.AllotmentSchema },
                { name: notification_schema_1.Notification.name, schema: notification_schema_1.NotificationSchema },
                { name: report_generated_schema_1.ReportGenerated.name, schema: report_generated_schema_1.ReportGeneratedSchema },
                { name: endpoints_schema_1.EndPoints.name, schema: endpoints_schema_1.EndPointsSchema },
                { name: plataform_schema_1.Plataform.name, schema: plataform_schema_1.PlataformSchema },
                { name: project_schema_1.Project.name, schema: project_schema_1.ProjectSchema },
                { name: registry_schema_1.Registry.name, schema: registry_schema_1.RegistrySchema },
            ]),
        ],
        exports: [mongoose_1.MongooseModule],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map