import { Test, TestingModule } from "@nestjs/testing";
import { BidService } from "./bid.service";
import { HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BidRepository } from "../repositories/bid.repository";
import { UserRepository } from "../repositories/user.repository";
import { AllotmentRepository } from "../repositories/allotment.repository";
import { NotificationService } from "./notification.service";
import { AgreementService } from "./agreement.service";
import { FileRepository } from "../repositories/file.repository";
import { SupplierService } from "./supplier.service";
import { ProposalRepository } from "../repositories/proposal.repository";
import { ContractRepository } from "../repositories/contract.repository";
import { CostItemsService } from "./cost-items.service";

import { ModelContractRepository } from "../repositories/model-contract.repository";
import { AssociationRepository } from "../repositories/association.repository";
import { SupplierRepository } from "../repositories/supplier.repository";
import { PlataformRepository } from "../repositories/plataform.repository";
import { ProjectService } from "./project.service";
import { LacchainModel } from "../models/blockchain/lacchain.model";
import { BidHistoryModel } from "../models/database/bid_history.model";
import { ItemsModel } from "../models/database/items.model";
import { RegistryService } from "./registry.service";
import { MyBidModel } from "../models/database/bid.model";
import { Types } from "mongoose";
import CryptoUtil from "src/shared/utils/crypto.util";

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
  const mockBidHistoryModel = {
    listByBidId: jest.fn(),
  };
  const mockLacchainModel = {
    getBidData: jest.fn(),
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
        { provide: CostItemsService, useValue: sampleMock },
        { provide: RegistryService, useValue: sampleMock },
        { provide: MyBidModel, useValue: sampleMock },
        ConfigService,
        { provide: ProjectService, useValue: sampleMock },
        { provide: LacchainModel, useValue: mockLacchainModel },
        { provide: BidHistoryModel, useValue: mockBidHistoryModel },
        { provide: ItemsModel, useValue: sampleMock },
      ],
    }).compile();

    service = module.get<BidService>(BidService);
  });

  describe('Test method: "getBidData"', () => {
    const mockBidHistoryListById = () => {
      const bidHistory = {
        _id: new Types.ObjectId(),
        createdAt: new Date(),
        data: {
          bidId: new Types.ObjectId(),
          description: "description",
          agreement: "agreement",
          classification: "classification",
          bid_type: "bid_type",
          state: "state",
          city: "city",
          association: "association",
          status: "status",
        },
        hash: "hash",
        txHash: "txHash",
      };
      mockBidHistoryModel.listByBidId.mockResolvedValue([bidHistory]);

      return [bidHistory];
    };
    it("return empty array when not has bid history", async () => {
      mockBidHistoryModel.listByBidId.mockResolvedValue([]);
      try {
        await service.getBidData("123");
        fail("Exceção não foi lançada");
      } catch (error) {
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(error.response).toEqual({
          success: false,
          data: null,
          errors: ["A licitação não existe"],
        });
      }
    });

    it("success return bids history (lacchain disabled)", async () => {
      process.env.BLOCKCHAIN_ACTIVE = "false";
      const [bidHistory] = mockBidHistoryListById();
      const response = await service.getBidData(
        bidHistory.data.bidId.toHexString(),
      );

      expect(response).toEqual([
        {
          _id: bidHistory._id,
          createdAt: expect.any(Date),
          data: bidHistory.data,
          hash: CryptoUtil.calculateHash(bidHistory.data),
          txHash: "txHash",
          verifiedByLacchain: {
            result: false,
            hash: "ENV_BLOCKCHAIN_ACTIVE_IS_FALSE",
          },
        },
      ]);
    });

    it("success return bids history (lacchain enabled)", async () => {
      process.env.BLOCKCHAIN_ACTIVE = "true";
      const [bidHistory] = mockBidHistoryListById();

      const hashBidData = CryptoUtil.calculateHash(bidHistory.data);
      mockLacchainModel.getBidData.mockResolvedValue({
        exist: true,
        txHash: hashBidData,
      });

      const response = await service.getBidData(
        bidHistory.data.bidId.toHexString(),
      );

      expect(response).toEqual([
        {
          _id: bidHistory._id,
          createdAt: expect.any(Date),
          data: bidHistory.data,
          hash: hashBidData,
          txHash: "txHash",
          verifiedByLacchain: {
            result: true,
            hash: hashBidData,
          },
        },
      ]);
    });

    it("success return bids history (not found on lacchain)", async () => {
      process.env.BLOCKCHAIN_ACTIVE = "true";
      const [bidHistory] = mockBidHistoryListById();
      const hashBidData = CryptoUtil.calculateHash(bidHistory.data);
      mockLacchainModel.getBidData.mockResolvedValue({
        exist: false,
        txHash: "",
      });

      const response = await service.getBidData(
        bidHistory.data.bidId.toHexString(),
      );

      expect(response).toEqual([
        {
          _id: bidHistory._id,
          createdAt: expect.any(Date),
          data: bidHistory.data,
          hash: hashBidData,
          txHash: "txHash",
          verifiedByLacchain: {
            result: false,
            hash: "",
          },
        },
      ]);
    });

    it("success return bids history (found on lacchain but hash is different)", async () => {
      process.env.BLOCKCHAIN_ACTIVE = "true";
      const [bidHistory] = mockBidHistoryListById();
      const hashBidData = CryptoUtil.calculateHash(bidHistory.data);
      mockLacchainModel.getBidData.mockResolvedValue({
        exist: true,
        txHash: "123",
      });

      const response = await service.getBidData(
        bidHistory.data.bidId.toHexString(),
      );

      expect(response).toEqual([
        {
          _id: bidHistory._id,
          createdAt: expect.any(Date),
          data: bidHistory.data,
          hash: hashBidData,
          txHash: "txHash",
          verifiedByLacchain: {
            result: false,
            hash: "123",
          },
        },
      ]);
    });
  });
});
