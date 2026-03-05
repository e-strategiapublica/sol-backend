import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../../src/modules/SOL/services/user.service";
import { UserRepository } from "../../src/modules/SOL/repositories/user.repository";
import { SupplierService } from "../../src/modules/SOL/services/supplier.service";
import { UserRegisterRequestDto } from "../../src/modules/SOL/dtos/user-register-request.dto";
import { UserTypeEnum } from "../../src/modules/SOL/enums/user-type.enum";
import { AssociationService } from "../../src/modules/SOL/services/association.service";
import { VerificationService } from "../../src/modules/SOL/services/verification.service";
import { BadRequestException } from "@nestjs/common";

// Mocks
const mockUserRepository = {
  getByDocument: jest.fn(),
  register: jest.fn(),
};

const mockSupplierService = {
  listById: jest.fn(),
};

const mockAssociationService = {};
const mockVerificationService = {};

describe("UserService", () => {
  let service: UserService;
  let userRepository: typeof mockUserRepository;
  let supplierService: typeof mockSupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: SupplierService, useValue: mockSupplierService },
        { provide: AssociationService, useValue: mockAssociationService },
        { provide: VerificationService, useValue: mockVerificationService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
    supplierService = module.get(SupplierService);
    jest.clearAllMocks();
  });

  it("should remove roles if user is supplier", async () => {
    const dto: UserRegisterRequestDto = {
      type: UserTypeEnum.fornecedor,
      roles: ["admin"],
      document: "123",
    } as any;
    userRepository.getByDocument.mockResolvedValue(null);
    supplierService.listById.mockResolvedValue(true);
    userRepository.register.mockResolvedValue({
      id: 1,
      email: "teste@exemplo.com",
    });
    await service.register(dto);
    expect(dto.roles).toBeUndefined();
  });

  it("should throw error if document already exists", async () => {
    const dto: UserRegisterRequestDto = {
      type: UserTypeEnum.administrador,
      document: "123",
    } as any;
    userRepository.getByDocument.mockResolvedValue({ id: 1 });
    await expect(service.register(dto)).rejects.toThrow(BadRequestException);
  });

  it("should throw error if supplier does not exist", async () => {
    const dto: UserRegisterRequestDto = {
      type: UserTypeEnum.administrador,
      document: "123",
      supplier: 99,
    } as any;
    userRepository.getByDocument.mockResolvedValue(null);
    supplierService.listById.mockResolvedValue(undefined);
    await expect(service.register(dto)).rejects.toThrow();
  });
});
