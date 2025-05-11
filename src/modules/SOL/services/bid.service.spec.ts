import { Test, TestingModule } from "@nestjs/testing";
import { BidService } from "./bid.service";
import { BadRequestException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModelContractClassificationEnum } from "../enums/modelContract-classification.enum";
import { BidRepository } from "../repositories/bid.repository";
import { UserRepository } from "../repositories/user.repository";
import { AllotmentRepository } from "../repositories/allotment.repository";
import { NotificationService } from "./notification.service";
import { AgreementService } from "./agreement.service";
import { FileRepository } from "../repositories/file.repository";
import { SupplierService } from "./supplier.service";
import { ProposalRepository } from "../repositories/proposal.repository";
import { ContractRepository } from "../repositories/contract.repository";
import { ModelContractRepository } from "../repositories/model-contract.repository";
import { AssociationRepository } from "../repositories/association.repository";
import { SupplierRepository } from "../repositories/supplier.repository";
import { PlataformRepository } from "../repositories/plataform.repository";
import { ProjectService } from "./project.service";
import { LacchainModel } from "../models/blockchain/lacchain.model";
import { BidHistoryModel } from "../models/database/bid_history.model";
import { ItemsModel } from "../models/database/items.model";
import * as fs from "fs";
import * as pdf from "pdf-parse";
import { ModelContractStatusEnum } from "../enums/model-contract-status.enum";

describe("BidService", () => {
  let service: BidService;

  const mockModelContractRepo = {
    getByContractAndLanguage: jest.fn(),
  };
  const mockBidsRepo = {
    getById: jest.fn(),
    list: jest.fn(),
    count: jest.fn(),
    register: jest.fn(),
    getByAgreementId: jest.fn(),
    update: jest.fn(),
    addProposal: jest.fn(),
    updateStatus: jest.fn(),
    listAllotmentByBidId: jest.fn(),
    deleteById: jest.fn(),
    listForSupplier: jest.fn(),
    listByIds: jest.fn(),
    sendTieBreaker: jest.fn(),
    rotineStatus: jest.fn(),
    addStartHour: jest.fn(),
    addEndHour: jest.fn(),
    getBidById: jest.fn(),
    getByReviewerId: jest.fn(),
    changeStatus: jest.fn(),
    listWithoutConcluded: jest.fn(),
  };
  const mockContractRepo = {
    getByBidId: jest.fn(),
  };
  const mockProposalRepo = {
    listByBid: jest.fn(),
  };

  const sampleMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BidService,
        { provide: BidRepository, useValue: mockBidsRepo },
        { provide: UserRepository, useValue: sampleMock },
        { provide: AllotmentRepository, useValue: sampleMock },
        { provide: NotificationService, useValue: sampleMock },
        { provide: AgreementService, useValue: sampleMock },
        FileRepository, // Usando a instância real
        { provide: SupplierService, useValue: sampleMock },
        { provide: ProposalRepository, useValue: mockProposalRepo },
        { provide: ContractRepository, useValue: mockContractRepo },
        { provide: ModelContractRepository, useValue: mockModelContractRepo },
        { provide: AssociationRepository, useValue: sampleMock },
        { provide: SupplierRepository, useValue: sampleMock },
        { provide: PlataformRepository, useValue: sampleMock },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key) => {
              // Retornar valores específicos para as chaves que o FileRepository usa
              if (key === "BUCKET") return "src/shared/documents";
              return "mock-value";
            }),
          },
        },
        { provide: ProjectService, useValue: sampleMock },
        { provide: LacchainModel, useValue: sampleMock },
        { provide: BidHistoryModel, useValue: sampleMock },
        { provide: ItemsModel, useValue: sampleMock },
      ],
    }).compile();

    service = module.get<BidService>(BidService);
  });

  it("should throw an error if no model contract is found", async () => {
    mockModelContractRepo.getByContractAndLanguage.mockResolvedValue(null);

    await expect(
      service.createDocument(
        "123",
        "english",
        ModelContractClassificationEnum.ata,
      ),
    ).rejects.toThrow("Modelo de documento não encontrado");
  });

  it("should throw an error if no content is found", async () => {
    mockModelContractRepo.getByContractAndLanguage.mockResolvedValue({
      contract: "template_nao_existente.docx",
    });
    await expect(
      service.createDocument(
        "123",
        "english",
        ModelContractClassificationEnum.ata,
      ),
    ).rejects.toThrow("Template não encontrado");
  });

  it.only("should create and delete a document file successfully", async () => {
    // Este teste verifica apenas se o método não lança exceção quando o modelo de contrato é encontrado
    mockModelContractRepo.getByContractAndLanguage.mockResolvedValue({
      contract: "template.docx",
      name: "Template Contract",
      status: ModelContractStatusEnum.ativo,
      classification: ModelContractClassificationEnum.ata,
      language: "english",
    });

    const mockBid = {
      _id: "68110898aae767c1ec129419",
      bid_count: "18",
      description: "asdfasdfasdfasdf",
      agreement: "67fd5c22d4e6c3bfd42ba0ea",
      classification: "bens",
      start_at: "",
      end_at: "1",
      days_to_tiebreaker: "1",
      days_to_delivery: "1",
      deleted: false,
      local_to_delivery: "Avenida Professor João Augusto de Carvalho",
      bid_type: "individualPrice",
      modality: "openClosed",
      status: "draft",
      aditional_site: "",
      add_allotment: [
        {
          _id: "AL123",
          allotment_name: "asdfasdfasdfasdf",
          days_to_delivery: "1",
          place_to_delivery: "Avenida Professor João Augusto de Carvalho",
          quantity: "2",
          files: "development-bucket/product_1745946776628.pdf",
          status: "rascunho",
          add_item: [
            {
              group: "Primeiro Grupo",
              item: "Primeiro Item",
              quantity: "2",
              unitMeasure: "Kg",
              specification: "",
            },
          ],
          proposals: [],
          createdAt: "2025-04-29T17:12:56.647Z",
          updatedAt: "2025-04-29T17:12:56.647Z",
          __v: 0,
        },
      ],
      invited_suppliers: [],
      state: "Rondônia",
      city: "Cabixi",
      association: "67fd5bc3d4e6c3bfd42ba0d0",
      additionalDocuments: [],
      createdAt: "2025-04-29T17:12:56.676Z",
      updatedAt: "2025-04-29T17:12:56.676Z",
      __v: 0,
    };
    mockBidsRepo.getById.mockResolvedValue(mockBid);

    const mockContract = {
      _id: "6123456789abcdef01234568",
      sequencial_number: 1,
      contract_number: "CONTR-001/2024",
      bid_number: "68110898aae767c1ec129419", // MongoDB ObjectId
      association_accept: true,
      supplier_accept: true,
      association_sign_date: "2024-05-15",
      supplier_sign_date: "2024-05-16",
      contract_document: "path/to/contract/document.pdf",
      value: "50000.00",
      deleted: false,
      status: "assinado",
      proposal_id: ["AL123"], // Array of MongoDB ObjectIds
      supplier_id: "6123456789abcdef01234569", // MongoDB ObjectId
      association_id: "6123456789abcdef01234570", // MongoDB ObjectId
      items_received: 10,
      createdAt: new Date("2024-05-10T10:00:00Z"),
      updatedAt: new Date("2024-05-16T15:30:00Z"),
    };
    mockContractRepo.getByBidId.mockResolvedValue([mockContract]);

    const mockProposal = {
      _id: "PR123",
      total_value: 45000.0,
      association_accept: false,
      supplier_accept: true,
      reviewer_accept: false,
      status: "aguardando1",
      deleted: false,
      item_list: ["Item 1", "Item 2", "Item 3"],
      bid: "68110898aae767c1ec129419", // MongoDB ObjectId
      allotment: [
        { _id: "AL123", quantity: 10 },
        { _id: "AL1234", quantity: 2 },
      ], // Array of MongoDB ObjectIds
      file: "path/to/proposal/document.pdf",
      proposalWin: false,
      refusedBecaused: "",
      refusedBy: null,
      proposedBy: "6123456789abcdef01234570", // MongoDB ObjectId
      acceptedRevisor: null,
      acceptedFornecedor: "6123456789abcdef01234571", // MongoDB ObjectId
      acceptedFornecedorAt: new Date("2024-05-15T14:30:00Z"),
      acceptedRevisorAt: null,
      refusedAt: null,
      freight: 1500,
      totalValueForAllotment: [
        { allotmentId: "6123456789abcdef01234568", value: 30000.0 },
        { allotmentId: "6123456789abcdef01234569", value: 15000.0 },
      ],
      createdAt: new Date("2024-05-10T10:00:00Z"),
      updatedAt: new Date("2024-05-15T14:30:00Z"),
    };
    mockProposalRepo.listByBid.mockResolvedValue([mockProposal]);

    jest.spyOn(service as any, "callPythonFile").mockResolvedValue(undefined);

    await expect(
      service.createDocument(
        "123",
        "english",
        ModelContractClassificationEnum.ata,
      ),
    ).resolves.not.toThrow();

    const filePath = "src/shared/documents/output.pdf";
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    expect(data.text).toContain(
      "\n\nDescrição da  licitação: Test Description\nNúmero da licitação: 1/2025\nNome do projeto: ",
    );
  });

  it("should throw BadRequestException if Python fails", async () => {
    mockModelContractRepo.getByContractAndLanguage.mockResolvedValue({
      contract: "template.docx",
    });

    const mockBid = {
      add_allotment: [],
      description: "desc",
      bid_count: 1,
      start_at: new Date(),
      association: {
        association: {
          name: "Org",
          address: {
            state: "State",
            publicPlace: "",
            number: "",
            complement: "",
            city: "",
            zipCode: "",
          },
          cnpj: "",
          legalRepresentative: { name: "Rep" },
        },
        email: "email@x.com",
      },
      agreement: {
        register_number: "123",
        register_object: "obj",
        workPlan: [],
      },
      local_to_delivery: "somewhere",
      days_to_delivery: 5,
      status: "open",
      invited_suppliers: [],
      createdAt: new Date(),
    };
    mockBidsRepo.getById.mockResolvedValue(mockBid);
    mockContractRepo.getByBidId.mockResolvedValue([]);
    mockProposalRepo.listByBid.mockResolvedValue([]);

    // Mockamos o método callPythonFile para simular um erro
    jest
      .spyOn(service as any, "callPythonFile")
      .mockRejectedValue(new Error("Python failed"));

    // Deve lançar BadRequestException com a mensagem específica
    await expect(
      service.createDocument(
        "123",
        "english",
        ModelContractClassificationEnum.ata,
      ),
    ).rejects.toThrow(
      new BadRequestException(
        "Erro ao converter o arquivo, verifique se o python está instalado e se o caminho está correto",
      ),
    );
  });

  // Teste de tabela para diferentes valores do enum ModelContractClassificationEnum
  describe.each([
    { type: ModelContractClassificationEnum.ata, description: "De Ata" },
    { type: ModelContractClassificationEnum.bens, description: "bens" },
    { type: ModelContractClassificationEnum.obras, description: "obras" },
    { type: ModelContractClassificationEnum.servicos, description: "servicos" },
    {
      type: ModelContractClassificationEnum.editalBens,
      description: "editalBens",
    },
    {
      type: ModelContractClassificationEnum.editalObras,
      description: "editalObras",
    },
    {
      type: ModelContractClassificationEnum.editalServicos,
      description: "editalServicos",
    },
  ])("createDocument with contract type $type", ({ type, description }) => {
    it(`should handle contract type ${description} correctly`, async () => {
      mockModelContractRepo.getByContractAndLanguage.mockResolvedValue({
        contract: "template.docx",
      });

      mockBidsRepo.getById.mockResolvedValue({
        add_allotment: [],
        description: "Test Description",
        bid_count: 1,
        start_at: new Date(),
        association: {
          association: {
            name: "Test Organization",
            address: {
              state: "Test State",
              publicPlace: "Test Street",
              number: "123",
              complement: "Test Complement",
              city: "Test City",
              zipCode: "12345-678",
            },
            cnpj: "12.345.678/0001-90",
            legalRepresentative: { name: "Test Representative" },
          },
          email: "test@example.com",
        },
        agreement: {
          register_number: "123456",
          register_object: "Test Object",
          workPlan: [],
        },
        local_to_delivery: "Test Delivery Location",
        days_to_delivery: 10,
        status: "open",
        invited_suppliers: [],
        createdAt: new Date(),
      });

      mockContractRepo.getByBidId.mockResolvedValue([
        {
          value: 1000,
          contract_number: "TEST-001",
          createdAt: new Date(),
          supplier_id: {
            name: "Test Supplier",
            cpf: "123.456.789-00",
            legal_representative: { name: "Test Legal Rep" },
            address: {
              publicPlace: "Test Supplier Street",
              number: "456",
              complement: "Test Supplier Complement",
              city: "Test Supplier City",
              state: "Test Supplier State",
              zipCode: "98765-432",
            },
          },
        },
      ]);

      mockProposalRepo.listByBid.mockResolvedValue([]);

      // jest.spyOn(fs, "unlinkSync").mockImplementation(() => null);

      await expect(
        service.createDocument("123", "english", type),
      ).resolves.not.toThrow();
    });
  });
});
