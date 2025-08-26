import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ProposalService } from '../../src/modules/SOL/services/proposal.service';
import { ProposalRepository } from '../../src/modules/SOL/repositories/proposal.repository';
import { AllotmentRepository } from '../../src/modules/SOL/repositories/allotment.repository';
import { AllotmentService } from '../../src/modules/SOL/services/allotment.service';
import { BidRepository } from '../../src/modules/SOL/repositories/bid.repository';
import { UserRepository } from '../../src/modules/SOL/repositories/user.repository';
import { ContractService } from '../../src/modules/SOL/services/contract.service';
import { NotificationService } from '../../src/modules/SOL/services/notification.service';
import { BidService } from '../../src/modules/SOL/services/bid.service';
import { ProposalRegisterDto } from '../../src/modules/SOL/dtos/proposal-register-request.dto';
import { ProposalStatusEnum } from '../../src/modules/SOL/enums/proposal-status.enum';
import { BidStatusEnum } from '../../src/modules/SOL/enums/bid-status.enum';
import { BidTypeEnum } from '../../src/modules/SOL/enums/bid-type.enum';
import { UserTypeEnum } from '../../src/modules/SOL/enums/user-type.enum';
import { AllotmentStatusEnum } from '../../src/modules/SOL/enums/allotment-status.enum';
import { ContractStatusEnum } from '../../src/modules/SOL/enums/contract-status.enum';
import { ProposalModel } from '../../src/modules/SOL/models/proposal.model';
import { BidModel } from '../../src/modules/SOL/models/bid.model';
import { UserModel } from '../../src/modules/SOL/models/user.model';
import { AllotmentModel } from '../../src/modules/SOL/models/allotment.model';

describe('ProposalService', () => {
  let service: ProposalService;
  let proposalRepository: jest.Mocked<ProposalRepository>;
  let allotmentRepository: jest.Mocked<AllotmentRepository>;
  let allotmentService: jest.Mocked<AllotmentService>;
  let bidRepository: jest.Mocked<BidRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let contractService: jest.Mocked<ContractService>;
  let notificationService: jest.Mocked<NotificationService>;
  let bidService: jest.Mocked<BidService>;

  // Mock data factories
  const createMockUser = (overrides: Partial<UserModel> = {}): UserModel => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    type: UserTypeEnum.fornecedor,
    supplier: {
      _id: faker.database.mongodbObjectId(),
      name: faker.company.name(),
    },
    ...overrides,
  } as UserModel);

  const createMockBid = (overrides: Partial<BidModel> = {}): BidModel => ({
    _id: faker.database.mongodbObjectId(),
    id: faker.database.mongodbObjectId(),
    bid_type: BidTypeEnum.globalPrice,
    status: BidStatusEnum.open,
    ...overrides,
  } as BidModel);

  const createMockAllotment = (overrides: Partial<AllotmentModel> = {}): AllotmentModel => ({
    _id: faker.database.mongodbObjectId(),
    id: faker.database.mongodbObjectId(),
    proposals: [],
    status: AllotmentStatusEnum.rascunho,
    ...overrides,
  } as AllotmentModel);

  const createMockProposal = (overrides: Partial<ProposalModel> = {}): ProposalModel => ({
    _id: faker.database.mongodbObjectId(),
    id: faker.database.mongodbObjectId(),
    total_value: faker.commerce.price(),
    status: ProposalStatusEnum.aguardando1,
    proposalWin: false,
    deleted: false,
    supplier_accept: false,
    association_accept: false,
    reviewer_accept: false,
    proposedBy: createMockUser(),
    bid: createMockBid(),
    allotment: [createMockAllotment()],
    freight: 0,
    ...overrides,
  } as ProposalModel);

  beforeEach(async () => {
    const mockProposalRepository = {
      register: jest.fn(),
      listNonDeleted: jest.fn(),
      getById: jest.fn(),
      listByBid: jest.fn(),
      listByUser: jest.fn(),
      updateAcceptSupplier: jest.fn(),
      updateAcceptAssociation: jest.fn(),
      updateAcceptReviewer: jest.fn(),
      updateStatus: jest.fn(),
      addItem: jest.fn(),
      removeItem: jest.fn(),
      deleteById: jest.fn(),
      updateProposedWin: jest.fn(),
      updateListProposedWin: jest.fn(),
      refusedProposal: jest.fn(),
      acceptForFornecedorProposal: jest.fn(),
      acceptForRevisorProposal: jest.fn(),
      getProposalWin: jest.fn(),
      listByBidsWaiting: jest.fn(),
      updateValues: jest.fn(),
    };

    const mockAllotmentRepository = {
      listById: jest.fn(),
      listByIds: jest.fn(),
      addProposal: jest.fn(),
      register: jest.fn(),
      updateStatusByIds: jest.fn(),
    };

    const mockAllotmentService = {
      updateStatus: jest.fn(),
    };

    const mockBidRepository = {
      getById: jest.fn(),
      changeStatus: jest.fn(),
    };

    const mockUserRepository = {
      getById: jest.fn(),
    };

    const mockContractService = {
      register: jest.fn(),
    };

    const mockNotificationService = {
      send: jest.fn(),
    };

    const mockBidService = {
      getById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProposalService,
        { provide: ProposalRepository, useValue: mockProposalRepository },
        { provide: AllotmentRepository, useValue: mockAllotmentRepository },
        { provide: AllotmentService, useValue: mockAllotmentService },
        { provide: BidRepository, useValue: mockBidRepository },
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: ContractService, useValue: mockContractService },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: BidService, useValue: mockBidService },
      ],
    }).compile();

    service = module.get<ProposalService>(ProposalService);
    proposalRepository = module.get(ProposalRepository);
    allotmentRepository = module.get(AllotmentRepository);
    allotmentService = module.get(AllotmentService);
    bidRepository = module.get(BidRepository);
    userRepository = module.get(UserRepository);
    contractService = module.get(ContractService);
    notificationService = module.get(NotificationService);
    bidService = module.get(BidService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new proposal successfully when no proposals exist', async () => {
      const proposedById = faker.database.mongodbObjectId();
      const mockUser = createMockUser();
      const mockBid = createMockBid({ status: BidStatusEnum.open, bid_type: BidTypeEnum.individualPrice });
      const mockAllotment = createMockAllotment();
      const mockProposal = createMockProposal();
      
      const allotmentId = faker.database.mongodbObjectId();
      const dto: ProposalRegisterDto = {
        total_value: faker.number.float({ min: 100, max: 1000 }).toString(),
        licitacaoId: faker.database.mongodbObjectId(),
        allotmentIds: [allotmentId],
        item_list: [],
        deleted: false,
        status: ProposalStatusEnum.aguardando1,
        proposedById,
        file: '',
        association_accept: false,
        supplier_accept: false,
        proposalWin: false,
        freight: 0,
        proposedBy: undefined,
        bid: undefined,
        allotment: undefined,
      };

      userRepository.getById.mockResolvedValue(mockUser);
      bidRepository.getById.mockResolvedValue(mockBid);
      allotmentRepository.listById.mockResolvedValue(mockAllotment);
      proposalRepository.listByBid.mockResolvedValue([]);
      proposalRepository.register.mockResolvedValue(mockProposal);
      allotmentRepository.addProposal.mockResolvedValue(mockAllotment);

      const result = await service.register(proposedById, dto);

      expect(result).toEqual(mockProposal);
      expect(proposalRepository.register).toHaveBeenCalledWith(
        expect.objectContaining({
          proposalWin: true,
          status: ProposalStatusEnum.aguardando1,
          proposedBy: mockUser,
          bid: mockBid,
          allotment: [mockAllotment],
        })
      );
      expect(allotmentRepository.addProposal).toHaveBeenCalled();
    });

    it('should throw BadRequestException when bid is closed', async () => {
      const proposedById = faker.database.mongodbObjectId();
      const mockUser = createMockUser();
      const mockBid = createMockBid({ status: BidStatusEnum.canceled });
      
      const allotmentId = faker.database.mongodbObjectId();
      const dto: ProposalRegisterDto = {
        total_value: faker.number.float({ min: 100, max: 1000 }).toString(),
        item_list: [faker.lorem.word()],
        licitacaoId: faker.database.mongodbObjectId(),
        proposedById: proposedById,
        allotmentIds: [allotmentId],
        proposalWin: false,
        freight: 0,
        proposedBy: undefined,
        bid: undefined,
        allotment: undefined,
        deleted: false,
        status: ProposalStatusEnum.aguardando1,
        file: faker.lorem.word(),
        association_accept: false,
        supplier_accept: false,
      };

      userRepository.getById.mockResolvedValue(mockUser);
      bidRepository.getById.mockResolvedValue(mockBid);

      await expect(service.register(proposedById, dto)).rejects.toThrow(
        new BadRequestException('Não é possivel cadastrar proposta para licitação fechada!')
      );
    });
  });

  describe('list', () => {
    it('should return all non-deleted proposals', async () => {
      const mockProposals = [createMockProposal(), createMockProposal()];
      proposalRepository.listNonDeleted.mockResolvedValue(mockProposals);

      const result = await service.list();

      expect(result).toEqual(mockProposals);
      expect(proposalRepository.listNonDeleted).toHaveBeenCalled();
    });
  });

  describe('updateAcceptfromSupplier', () => {
    it('should update supplier acceptance successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();
      const updatedProposal = createMockProposal({ supplier_accept: true });
      const dto = { supplier_accept: true };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.updateAcceptSupplier.mockResolvedValue(updatedProposal);

      const result = await service.updateAcceptfromSupplier(proposalId, dto);

      expect(result).toEqual(updatedProposal);
      expect(proposalRepository.updateAcceptSupplier).toHaveBeenCalledWith(proposalId, dto);
    });

    it('should throw BadRequestException when proposal not found', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const dto = { supplier_accept: true };

      proposalRepository.getById.mockResolvedValue(null);

      await expect(service.updateAcceptfromSupplier(proposalId, dto)).rejects.toThrow(
        new BadRequestException('Proposta não encontrada!')
      );
    });
  });

  describe('getById', () => {
    it('should return proposal by id successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();

      proposalRepository.getById.mockResolvedValue(mockProposal);

      const result = await service.getById(proposalId);

      expect(result).toEqual(mockProposal);
      expect(proposalRepository.getById).toHaveBeenCalledWith(proposalId);
    });

    it('should throw BadRequestException when proposal not found', async () => {
      const proposalId = faker.database.mongodbObjectId();

      proposalRepository.getById.mockResolvedValue(null);

      await expect(service.getById(proposalId)).rejects.toThrow(
        new BadRequestException('Proposta não encontrada!')
      );
    });

    it('should throw BadRequestException when proposal is deleted', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const deletedProposal = createMockProposal({ deleted: true });

      proposalRepository.getById.mockResolvedValue(deletedProposal);

      await expect(service.getById(proposalId)).rejects.toThrow(
        new BadRequestException('Esse contrato já foi deletado!')
      );
    });
  });

  describe('deleteById', () => {
    it('should delete proposal by id', async () => {
      const proposalId = faker.database.mongodbObjectId();

      proposalRepository.deleteById.mockResolvedValue(undefined);

      const result = await service.deleteById(proposalId);

      expect(proposalRepository.deleteById).toHaveBeenCalledWith(proposalId);
    });
  });

  describe('listByBid', () => {
    it('should return proposals by bid id', async () => {
      const bidId = faker.database.mongodbObjectId();
      const mockProposals = [createMockProposal()];
      const mockBid = createMockBid();
      const mockResponse = { proposals: mockProposals, bid: mockBid };

      proposalRepository.listByBid.mockResolvedValue(mockProposals);
      bidService.getById.mockResolvedValue(mockBid);

      const result = await service.listByBid(bidId);

      expect(proposalRepository.listByBid).toHaveBeenCalledWith(bidId);
      expect(bidService.getById).toHaveBeenCalledWith(bidId);
    });
  });

  describe('getProposalAcceptByBid', () => {
    it('should return accepted winning proposal', async () => {
      const bidId = faker.database.mongodbObjectId();
      const winningProposal = createMockProposal({ 
        proposalWin: true 
      }) as any;
      winningProposal.acceptedFornecedor = true;
      const mockProposals = [winningProposal, createMockProposal()];

      proposalRepository.listByBid.mockResolvedValue(mockProposals);

      const result = await service.getProposalAcceptByBid(bidId);

      expect(result).toEqual(winningProposal);
    });

    it('should return undefined when no accepted winning proposal exists', async () => {
      const bidId = faker.database.mongodbObjectId();
      const mockProposals = [createMockProposal()];

      proposalRepository.listByBid.mockResolvedValue(mockProposals);

      const result = await service.getProposalAcceptByBid(bidId);

      expect(result).toBeUndefined();
    });
  });

  describe('updateAcceptAssociation', () => {
    it('should update association acceptance successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();
      const updatedProposal = createMockProposal({ association_accept: true });
      const dto = { association_accept: true };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.updateAcceptAssociation.mockResolvedValue(updatedProposal);

      const result = await service.updateAcceptAssociation(proposalId, dto);

      expect(result).toEqual(updatedProposal);
      expect(proposalRepository.updateAcceptAssociation).toHaveBeenCalledWith(proposalId, dto);
    });

    it('should throw BadRequestException when proposal not found', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const dto = { association_accept: true };

      proposalRepository.getById.mockResolvedValue(null);

      await expect(service.updateAcceptAssociation(proposalId, dto)).rejects.toThrow(
        new BadRequestException('Proposta não encontrada!')
      );
    });

    it('should update status when both supplier and association accept', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();
      const updatedProposal = createMockProposal({ 
        supplier_accept: true, 
        association_accept: true 
      });
      const dto = { association_accept: true };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.updateAcceptAssociation.mockResolvedValue(updatedProposal);
      proposalRepository.updateStatus.mockResolvedValue(updatedProposal);

      const result = await service.updateAcceptAssociation(proposalId, dto);

      expect(proposalRepository.updateStatus).toHaveBeenCalledWith(
        proposalId,
        { status: ProposalStatusEnum.aceitoAssociacao }
      );
    });
  });

  describe('updateAcceptReviewer', () => {
    it('should update reviewer acceptance successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const userId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal({
        association_accept: true,
        reviewer_accept: true,
      });
      const dto = { reviewer_accept: true, acceptedRevisorAt: new Date().toISOString() };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.updateAcceptReviewer.mockResolvedValue(mockProposal);
      allotmentService.updateStatus.mockResolvedValue(undefined);

      jest.spyOn(service, 'acceptProposal').mockResolvedValue(mockProposal);

      const result = await service.updateAcceptReviewer(proposalId, dto, userId);

      expect(proposalRepository.updateAcceptReviewer).toHaveBeenCalledWith(proposalId, dto);
      expect(allotmentService.updateStatus).toHaveBeenCalledWith(
        mockProposal.allotment[0].id,
        AllotmentStatusEnum.adjudicado
      );
      expect(service.acceptProposal).toHaveBeenCalledWith(mockProposal._id.toString(), userId);
    });

    it('should update allotment status to failed when reviewer rejects', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const userId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();
      const dto = { reviewer_accept: false, acceptedRevisorAt: new Date().toISOString() };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.updateAcceptReviewer.mockResolvedValue(mockProposal);
      allotmentService.updateStatus.mockResolvedValue(undefined);

      const result = await service.updateAcceptReviewer(proposalId, dto, userId);

      expect(allotmentService.updateStatus).toHaveBeenCalledWith(
        mockProposal.allotment[0].id,
        AllotmentStatusEnum.fracassado
      );
    });
  });

  describe('refusedProposal', () => {
    it('should refuse proposal successfully by association', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const refusedById = faker.database.mongodbObjectId();
      const mockUser = createMockUser({ type: UserTypeEnum.associacao });
      const mockProposal = createMockProposal();
      const dto = { 
        refusedBecaused: 'Test reason',
        refusedAt: new Date(),
        data: {} as any,
        status: ProposalStatusEnum.recusadaAssociacao,
        refusedBy: mockUser
      };
      const refusedProposal = createMockProposal({ 
        status: ProposalStatusEnum.recusadaAssociacao 
      });

      userRepository.getById.mockResolvedValue(mockUser);
      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.listByBid.mockResolvedValue([mockProposal]);
      proposalRepository.updateProposedWin.mockResolvedValue(mockProposal);
      proposalRepository.refusedProposal.mockResolvedValue(refusedProposal);
      allotmentService.updateStatus.mockResolvedValue(undefined);

      const result = await service.refusedProposal(proposalId, refusedById, dto);

      expect(result).toEqual(refusedProposal);
      expect(proposalRepository.refusedProposal).toHaveBeenCalledWith(
        proposalId,
        expect.objectContaining({
          refusedBy: mockUser,
          status: ProposalStatusEnum.recusadaAssociacao,
          refusedAt: expect.any(Date),
        })
      );
    });

    it('should refuse proposal successfully by reviewer', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const refusedById = faker.database.mongodbObjectId();
      const mockUser = createMockUser({ type: UserTypeEnum.administrador });
      const mockProposal = createMockProposal();
      const dto = { 
        refusedBecaused: 'Test reason',
        refusedAt: new Date(),
        data: {} as any,
        status: ProposalStatusEnum.recusadaRevisor,
        refusedBy: mockUser
      };
      const refusedProposal = createMockProposal({ 
        status: ProposalStatusEnum.recusadaRevisor 
      });

      userRepository.getById.mockResolvedValue(mockUser);
      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.listByBid.mockResolvedValue([mockProposal]);
      proposalRepository.updateProposedWin.mockResolvedValue(mockProposal);
      proposalRepository.refusedProposal.mockResolvedValue(refusedProposal);
      allotmentService.updateStatus.mockResolvedValue(undefined);

      const result = await service.refusedProposal(proposalId, refusedById, dto);

      expect(result).toEqual(refusedProposal);
      expect(proposalRepository.refusedProposal).toHaveBeenCalledWith(
        proposalId,
        expect.objectContaining({
          refusedBy: mockUser,
          status: ProposalStatusEnum.recusadaRevisor,
          refusedAt: expect.any(Date),
        })
      );
    });
  });

  describe('acceptProposal', () => {
    it('should accept proposal by association successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const acceptById = faker.database.mongodbObjectId();
      const mockUser = createMockUser({ type: UserTypeEnum.associacao });
      
      // Create a proper mock proposal structure
      const mockProposalInAllotment = createMockProposal({ _id: proposalId });
      const mockAllotment = createMockAllotment({
        proposals: [{ proposal: mockProposalInAllotment, proposalWin: false }]
      });
      const mockProposal = createMockProposal({ 
        _id: proposalId,
        allotment: [mockAllotment] 
      });
      
      const acceptedProposal = createMockProposal({ 
        status: ProposalStatusEnum.aceitoAssociacao 
      });

      userRepository.getById.mockResolvedValue(mockUser);
      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.updateAcceptAssociation.mockResolvedValue(mockProposal);
      proposalRepository.acceptForFornecedorProposal.mockResolvedValue(acceptedProposal);
      proposalRepository.updateStatus.mockResolvedValue(acceptedProposal);
      allotmentService.updateStatus.mockResolvedValue(undefined);
      allotmentRepository.register.mockResolvedValue(mockAllotment);

      const result = await service.acceptProposal(proposalId, acceptById);

      expect(result).toEqual(acceptedProposal);
      expect(proposalRepository.updateAcceptAssociation).toHaveBeenCalled();
      expect(allotmentService.updateStatus).toHaveBeenCalledWith(
        mockAllotment._id.toString(),
        AllotmentStatusEnum.adjudicado
      );
    });

    it('should accept proposal by reviewer and create contract', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const acceptById = faker.database.mongodbObjectId();
      const mockUser = createMockUser({ type: UserTypeEnum.administrador });
      
      // Create a proper mock proposal structure
      const mockProposalInAllotment = createMockProposal({ _id: proposalId });
      const mockAllotment = createMockAllotment({
        proposals: [{ proposal: mockProposalInAllotment, proposalWin: false }]
      });
      const mockProposal = createMockProposal({ 
        _id: proposalId,
        allotment: [mockAllotment] 
      });
      
      const mockBid = createMockBid();
      const acceptedProposal = createMockProposal({ 
        status: ProposalStatusEnum.aceitoRevisor 
      });

      userRepository.getById.mockResolvedValue(mockUser);
      proposalRepository.getById.mockResolvedValue(mockProposal);
      bidRepository.getById.mockResolvedValue(mockBid);
      bidRepository.changeStatus.mockResolvedValue(mockBid);
      allotmentRepository.updateStatusByIds.mockResolvedValue(undefined);
      allotmentRepository.register.mockResolvedValue(mockAllotment);
      proposalRepository.acceptForRevisorProposal.mockResolvedValue(acceptedProposal);
      contractService.register.mockResolvedValue({} as any);

      const result = await service.acceptProposal(proposalId, acceptById);

      expect(result).toEqual(acceptedProposal);
      expect(contractService.register).toHaveBeenCalledWith(
        expect.objectContaining({
          status: ContractStatusEnum.aguardando_assinaturas,
          proposal_id: [mockProposal],
        })
      );
      expect(bidRepository.changeStatus).toHaveBeenCalledWith(
        expect.any(String),
        { status: BidStatusEnum.completed }
      );
    });

    it('should throw BadRequestException when allotment is under analysis', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const acceptById = faker.database.mongodbObjectId();
      const mockUser = createMockUser({ type: UserTypeEnum.associacao });
      const mockAllotment = createMockAllotment({ status: AllotmentStatusEnum.emAnalise });
      const mockProposal = createMockProposal({ allotment: [mockAllotment] });

      userRepository.getById.mockResolvedValue(mockUser);
      proposalRepository.getById.mockResolvedValue(mockProposal);

      await expect(service.acceptProposal(proposalId, acceptById)).rejects.toThrow(
        new BadRequestException('Não é possível recusar propostas enquanto o lote está em análise.')
      );
    });
  });

  describe('updateStatus', () => {
    it('should update proposal status successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();
      const updatedProposal = createMockProposal({ 
        status: ProposalStatusEnum.aceitoAssociacao 
      });
      const dto = { status: ProposalStatusEnum.aceitoAssociacao };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.updateStatus.mockResolvedValue(updatedProposal);

      const result = await service.updateStatus(proposalId, dto);

      expect(result).toEqual(updatedProposal);
      expect(proposalRepository.updateStatus).toHaveBeenCalledWith(proposalId, dto);
    });

    it('should throw BadRequestException when proposal not found', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const dto = { status: ProposalStatusEnum.aceitoAssociacao };

      proposalRepository.getById.mockResolvedValue(null);

      await expect(service.updateStatus(proposalId, dto)).rejects.toThrow(
        new BadRequestException('Proposta não encontrada!')
      );
    });
  });

  describe('getByUserInBid', () => {
    it('should return true when user has proposal in allotment', async () => {
      const proposedById = faker.database.mongodbObjectId();
      const allotmentId = faker.database.mongodbObjectId();
      const mockAllotment = createMockAllotment({ _id: allotmentId });
      const mockProposal = createMockProposal({ allotment: [mockAllotment] });

      proposalRepository.listByUser.mockResolvedValue([mockProposal]);

      const result = await service.getByUserInBid(proposedById, allotmentId);

      expect(result).toBe(true);
      expect(proposalRepository.listByUser).toHaveBeenCalledWith(proposedById);
    });

    it('should return false when user has no proposal in allotment', async () => {
      const proposedById = faker.database.mongodbObjectId();
      const allotmentId = faker.database.mongodbObjectId();

      proposalRepository.listByUser.mockResolvedValue([]);

      const result = await service.getByUserInBid(proposedById, allotmentId);

      expect(result).toBe(false);
    });
  });

  describe('addItem', () => {
    it('should add item to proposal successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();
      const dto = { item_list: 'new-item' };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.addItem.mockResolvedValue(mockProposal);

      const result = await service.addItem(proposalId, dto);

      expect(result).toEqual(mockProposal);
      expect(proposalRepository.addItem).toHaveBeenCalledWith(proposalId, dto);
    });

    it('should throw BadRequestException when proposal not found', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const dto = { item_list: 'new-item' };

      proposalRepository.getById.mockResolvedValue(null);

      await expect(service.addItem(proposalId, dto)).rejects.toThrow(
        new BadRequestException('Proposta não encontrada!')
      );
    });
  });

  describe('removeItem', () => {
    it('should remove item from proposal successfully', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const mockProposal = createMockProposal();
      const dto = { item_list: 'item-to-remove' };

      proposalRepository.getById.mockResolvedValue(mockProposal);
      proposalRepository.removeItem.mockResolvedValue(mockProposal);

      const result = await service.removeItem(proposalId, dto);

      expect(result).toEqual(mockProposal);
      expect(proposalRepository.removeItem).toHaveBeenCalledWith(proposalId, dto);
    });

    it('should throw BadRequestException when proposal not found', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const dto = { item_list: 'item-to-remove' };

      proposalRepository.getById.mockResolvedValue(null);

      await expect(service.removeItem(proposalId, dto)).rejects.toThrow(
        new BadRequestException('Proposta não encontrada!')
      );
    });
  });

  describe('updateValues', () => {
    it('should update proposal values successfully for globalPrice bid', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const dto = { total_value: '2000', freight: 100 };
      const mockBid = createMockBid({ bid_type: BidTypeEnum.globalPrice });
      const updatedProposal = createMockProposal({ 
        total_value: '2000', 
        freight: 100, 
        bid: mockBid 
      });
      const mockAllotments = [createMockAllotment()];
      const proposalList = [updatedProposal];

      proposalRepository.updateValues.mockResolvedValue(updatedProposal);
      proposalRepository.listByBid.mockResolvedValue(proposalList);
      allotmentRepository.listByIds.mockResolvedValue(mockAllotments);
      proposalRepository.updateListProposedWin.mockResolvedValue(undefined);
      allotmentRepository.addProposal.mockResolvedValue(mockAllotments[0]);

      const result = await service.updateValues(proposalId, dto);

      expect(result).toEqual(updatedProposal);
      expect(proposalRepository.updateValues).toHaveBeenCalledWith(proposalId, dto);
      expect(proposalRepository.updateListProposedWin).toHaveBeenCalled();
    });

    it('should update proposal values successfully for non-globalPrice bid', async () => {
      const proposalId = faker.database.mongodbObjectId();
      const dto = { total_value: '2000', freight: 100 };
      const mockBid = createMockBid({ bid_type: BidTypeEnum.individualPrice });
      const updatedProposal = createMockProposal({ 
        total_value: '2000', 
        freight: 100, 
        bid: mockBid 
      });
      const mockAllotments = [createMockAllotment({
        proposals: [{ proposal: updatedProposal, proposalWin: false }]
      })];
      const proposalList = [updatedProposal];

      proposalRepository.updateValues.mockResolvedValue(updatedProposal);
      proposalRepository.listByBid.mockResolvedValue(proposalList);
      allotmentRepository.listByIds.mockResolvedValue(mockAllotments);
      proposalRepository.updateListProposedWin.mockResolvedValue(undefined);
      allotmentRepository.addProposal.mockResolvedValue(mockAllotments[0]);

      const result = await service.updateValues(proposalId, dto);

      expect(result).toEqual(updatedProposal);
      expect(proposalRepository.updateValues).toHaveBeenCalledWith(proposalId, dto);
    });
  });
});
