import { faker } from "@faker-js/faker";
import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { UserRolesEnum } from "src/modules/SOL/enums/user-roles.enum";
import { UserStatusEnum } from "src/modules/SOL/enums/user-status.enum";
import { UserTypeEnum } from "src/modules/SOL/enums/user-type.enum";
import { User } from "src/modules/SOL/schemas/user.schema";
import CryptoUtil from "src/shared/utils/crypto.util";
import { loginRequest } from "./common.request";
import { Supplier } from "src/modules/SOL/schemas/supplier.schema";
import { SuplierTypeEnum } from "src/modules/SOL/enums/supplier-type.enum";
import { Agreement } from "src/modules/SOL/schemas/agreement.schema";
import { AgreementStatusEnum } from "src/modules/SOL/enums/agreement-status.enum";
import { ModelContract } from "src/modules/SOL/schemas/model-contract.schemay";
import { ModelContractStatusEnum } from "src/modules/SOL/enums/model-contract-status.enum";
import { ModelContractClassificationEnum } from "src/modules/SOL/enums/modelContract-classification.enum";
import { LanguageContractEnum } from "src/modules/SOL/enums/language-contract.enum";
import { Bids } from "src/modules/SOL/schemas/bids.schema";
import { BidStatusEnum } from "src/modules/SOL/enums/bid-status.enum";
import { BidModalityEnum } from "src/modules/SOL/enums/bid-modality.enum";
import { BidTypeEnum } from "src/modules/SOL/enums/bid-type.enum";
import { Allotment } from "src/modules/SOL/schemas/allotment.schema";
import { AllotmentStatusEnum } from "src/modules/SOL/enums/allotment-status.enum";
import { Proposal } from "src/modules/SOL/schemas/proposal.schema";
import { ProposalStatusEnum } from "src/modules/SOL/enums/proposal-status.enum";
import { Contract } from "src/modules/SOL/schemas/contract.schema";
import { ContractStatusEnum } from "src/modules/SOL/enums/contract-status.enum";
import { Association } from "src/modules/SOL/schemas/association.schema";
import { Project } from "src/modules/SOL/schemas/project.schema";
import { AgreementActiveStatusEnum } from "src/modules/SOL/enums/agreement-active-status";
import { MaritalStatusEnum } from "src/modules/SOL/enums/marital-status.enum";

export const setupLogin = async (app: INestApplication) => {
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const email = faker.internet.email();
  const password = faker.internet.password();

  await userModel.create({
    name: faker.person.fullName(),
    email,
    status: UserStatusEnum.active,
    type: UserTypeEnum.administrador,
    roles: UserRolesEnum.geral,
    password: await CryptoUtil.encryptPassword(password),
  });

  const payloadKey = process.env.ENCRYPT_KEY;
  const encryptPayload = CryptoUtil.encrypt(
    payloadKey,
    JSON.stringify({ email, password }),
  );

  const loginResponse = await loginRequest(app, {
    payload: encryptPayload,
  });
  const { token } = loginResponse.body.data;
  return { token: `Bearer ${token}` };
};

/**
 * Prepares the database with all necessary models for testing the create-document route
 * @param app NestJS application instance
 * @param language Language for the document (default: portuguese)
 * @param type Document classification type
 * @returns Object containing all created models and their IDs
 */
export const prepareToTestCreateDocument = async (
  app: INestApplication,
  language: string = LanguageContractEnum.portuguese,
  type: ModelContractClassificationEnum = ModelContractClassificationEnum.bens,
) => {
  // Get all model tokens
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const supplierModel = app.get<Model<Supplier>>(getModelToken(Supplier.name));
  const associationModel = app.get<Model<Association>>(
    getModelToken(Association.name),
  );
  const projectModel = app.get<Model<Project>>(getModelToken(Project.name));
  const agreementModel = app.get<Model<Agreement>>(
    getModelToken(Agreement.name),
  );
  const modelContractModel = app.get<Model<ModelContract>>(
    getModelToken(ModelContract.name),
  );
  const bidsModel = app.get<Model<Bids>>(getModelToken(Bids.name));
  const allotmentModel = app.get<Model<Allotment>>(
    getModelToken(Allotment.name),
  );
  const proposalModel = app.get<Model<Proposal>>(getModelToken(Proposal.name));
  const contractModel = app.get<Model<Contract>>(getModelToken(Contract.name));
  const legalRepresentative = {
    name: faker.person.fullName(),
    nationality: faker.location.country(),
    maritalStatus: "solteiro",
    rg: faker.string.numeric(9),
    cpf: faker.string.numeric(11),
    address: {
      zipCode: faker.location.zipCode(),
      publicPlace: faker.location.street(),
      number: faker.string.numeric(3),
      complement: faker.location.secondaryAddress(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      state: faker.location.state(),
    },
  };
  // Create Association
  const association = await associationModel.create({
    name: faker.company.name(),
    cnpj: faker.string.numeric(14),
    legalRepresentative,
    address: {
      zipCode: faker.location.zipCode(),
      publicPlace: faker.location.street(),
      number: faker.string.numeric(3),
      complement: faker.location.secondaryAddress(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      state: faker.location.state(),
    },
  });

  // Create Association User
  const associationUser = await userModel.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    status: UserStatusEnum.active,
    type: UserTypeEnum.associacao,
    roles: UserRolesEnum.geral,
    password: await CryptoUtil.encryptPassword(faker.internet.password()),
    association: association._id,
  });

  // Create Project Manager User
  const projectManagerUser = await userModel.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    status: UserStatusEnum.active,
    type: UserTypeEnum.project_manager,
    roles: UserRolesEnum.geral,
    password: await CryptoUtil.encryptPassword(faker.internet.password()),
  });

  // Create Project
  const project = await projectModel.create({
    name: faker.company.name(),
    activeStatus: AgreementActiveStatusEnum.active,
    project_manager: projectManagerUser._id,
    legalRepresentative,
    viewer_list: [associationUser._id],
    reviewer_list: [projectManagerUser._id],
  });

  // Create Supplier
  const supplier = await supplierModel.create({
    name: faker.company.name(),
    cpf: faker.string.numeric(11),
    type: SuplierTypeEnum.pessoa_juridica,
    blocked: false,
    address: {
      zipCode: faker.location.zipCode(),
      publicPlace: faker.location.street(),
      number: faker.string.numeric(3),
      complement: faker.location.secondaryAddress(),
      neighborhood: faker.location.county(),
      city: faker.location.city(),
      state: faker.location.state(),
    },
    legal_representative: legalRepresentative,
  });

  // Create Supplier User
  const supplierUser = await userModel.create({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    status: UserStatusEnum.active,
    type: UserTypeEnum.fornecedor,
    roles: UserRolesEnum.geral,
    password: await CryptoUtil.encryptPassword(faker.internet.password()),
    supplier: supplier._id,
  });

  // Create Agreement
  const agreement = await agreementModel.create({
    register_number: faker.string.numeric(6),
    register_object: faker.commerce.productName(),
    status: AgreementStatusEnum.inExecution,
    value: Number(faker.number.int({ min: 10000, max: 1000000 })),
    signature_date: faker.date.past(),
    validity_date: faker.date.future(),
    manager: associationUser._id,
    city: faker.location.city(),
    states: faker.location.state(),
    association: association._id,
    project: project._id,
    activeStatus: AgreementActiveStatusEnum.active,
    reviewer: projectManagerUser._id,
  });

  // Create Model Contract
  const modelContract = await modelContractModel.create({
    name: `Modelo de ${type}`,
    status: ModelContractStatusEnum.ativo,
    classification: type,
    contract: "template.docx", // This should be a real file in the system
    language: language,
  });

  // Create Allotments
  const allotments = [];
  for (let i = 0; i < 2; i++) {
    const allotment = await allotmentModel.create({
      allotment_name: faker.commerce.productName(),
      days_to_delivery: faker.number.int({ min: 1, max: 30 }).toString(),
      place_to_delivery: faker.location.streetAddress(),
      quantity: faker.number.int({ min: 1, max: 100 }).toString(),
      files: "product_file.pdf", // This should be a real file in the system
      unitMeasure: faker.science.unit().name,
      add_item: [],
      proposals: [],
      status: AllotmentStatusEnum.rascunho,
    });
    allotments.push(allotment);
  }

  // Create Bid
  const bid = await bidsModel.create({
    bid_count: faker.string.numeric(4),
    description: faker.commerce.productDescription(),
    classification: type,
    start_at: faker.date.past().toISOString(),
    end_at: faker.date.future().toISOString(),
    days_to_tiebreaker: faker.number.int({ min: 1, max: 5 }).toString(),
    days_to_delivery: faker.number.int({ min: 10, max: 30 }).toString(),
    local_to_delivery: faker.location.streetAddress(),
    bid_type: BidTypeEnum.individualPrice,
    modality: BidModalityEnum.openClosed,
    aditional_site: faker.internet.url(),
    add_allotment: allotments.map((a) => a._id),
    invited_suppliers: [],
    state: faker.location.state(),
    city: faker.location.city(),
    status: BidStatusEnum.open,
    association: associationUser._id,
    agreement: agreement._id,
    editalFile: "edital_file.pdf", // This should be a real file in the system
  });

  // Create Proposal
  const proposal = await proposalModel.create({
    total_value: faker.number.int({ min: 5000, max: 50000 }).toString(),
    association_accept: true,
    supplier_accept: true,
    reviewer_accept: true,
    status: ProposalStatusEnum.aguardando1,
    deleted: false,
    item_list: ["item1", "item2"],
    bid: bid._id,
    allotment: allotments.map((a) => a._id),
    file: "proposal_file.pdf", // This should be a real file in the system
    proposalWin: true,
    proposedBy: supplierUser._id,
    acceptedRevisor: associationUser._id,
    acceptedFornecedor: supplierUser._id,
  });

  // Create Contract
  const contract = await contractModel.create({
    sequencial_number: faker.number.int({ min: 1, max: 1000 }),
    contract_number: `CONT-${faker.string.numeric(4)}`,
    bid_number: bid._id,
    association_accept: true,
    supplier_accept: true,
    association_sign_date: faker.date.recent().toISOString(),
    supplier_sign_date: faker.date.recent().toISOString(),
    contract_document: "contract_document.pdf", // This should be a real file in the system
    value: faker.number.int({ min: 5000, max: 50000 }).toString(),
    deleted: false,
    status: ContractStatusEnum.aguardando_assinaturas,
    proposal_id: [proposal._id],
    supplier_id: supplier._id,
    association_id: associationUser._id,
    items_received: 0,
  });

  return {
    association,
    associationUser,
    supplier,
    supplierUser,
    agreement,
    modelContract,
    allotments,
    bid,
    proposal,
    contract,
    bidId: bid._id.toString(),
  };
};
