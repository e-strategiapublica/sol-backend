import { Test, TestingModule } from '@nestjs/testing';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { AgreementRegisterRequestDto } from '../dtos/agreement-register-request.dto';
import { UserTypeRequestDto } from '../dtos/user-type-request.dto';
import { AgreementStatusEnum } from '../enums/agreement-status.enum';
import { UserRolesEnum } from '../enums/user-roles.enum';
import { UserTypeEnum } from '../enums/user-type.enum';
import { AgreementInterface } from '../interfaces/agreement.interface';
import { AssociationModel } from '../models/association.model';
import { ProjectModel } from '../models/project.model';
import { UserModel } from '../models/user.model';
import { AgreementController } from '../controllers/agreement.controller';
import { AgreementService } from './agreement.service';
import { WorkPlanWorkPlanRequestDto } from '../dtos/work-plan-add-work-plan-request.dto';

describe('AgreementController', () => {
  let controller: AgreementController;
  let service: AgreementService;

  // Mocks comuns
  const user: JwtPayload = {
    userId: '123',
    email: 'test@example.com',
    type: UserTypeEnum.administrador,
    tfaRegistered: true,
    tfaAuthenticate: true,
  };

  // Mock de um acordo para os testes
  const mockAgreement: AgreementInterface = {
    register_number: 'ABC123',
    register_object: 'Agreement Test',
    status: AgreementStatusEnum.inExecution,
    city: 'Sample City',
    states: 'SP',
    value: 10000,
    validity_date: new Date(),
    signature_date: new Date(),
    association: {} as AssociationModel,
    project: {} as ProjectModel,
    manager: {} as UserModel,
    workPlan: [],
    project_id: {} as ProjectModel,
    reviewer: {} as UserModel,
  };

  beforeEach(async () => {
    // Configuração do módulo de testes
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgreementController],
      providers: [
        {
          provide: AgreementService,
          useValue: {
            findAgreementsWithOutProject: jest.fn(),
            findAll: jest.fn(),
            findForAssociation: jest.fn(),
            getAgreementsWithProjects: jest.fn(),
            register: jest.fn(),
            findById: jest.fn(),
            findAgreementByUserId: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
            addWorkPlan: jest.fn(),
            removeWorkPlan: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AgreementController>(AgreementController);
    service = module.get<AgreementService>(AgreementService);
  });

  // Teste de chamada do método 'findAgreementsWithOutProject' quando 'withoutProject=true'
  it('should call findAgreementsWithOutProject when withoutProject=true [/]', async () => {
    const findAgreementsWithOutProjectSpy = jest
      .spyOn(service, 'findAgreementsWithOutProject')
      .mockResolvedValue([]);

    await controller.get('true');

    expect(findAgreementsWithOutProjectSpy).toHaveBeenCalled();
  });

  // Teste de chamada do método 'findAll' quando 'withoutProject=false' ou indefinido
  it('should call findAll when withoutProject is false or undefined [/]', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue([]);

    await controller.get();
    await controller.get('false');

    expect(findAllSpy).toHaveBeenCalledTimes(2);
  });

  // Teste de chamada do método 'findForAssociation' com o userId do JwtPayload
  it('should call findForAssociation with userId from JwtPayload [/for-association]', async () => {
    const findForAssociationSpy = jest
      .spyOn(service, 'findForAssociation')
      .mockResolvedValue([]);

    await controller.getForAssociation(user);

    expect(findForAssociationSpy).toHaveBeenCalledWith(user.userId);
  });

  // Teste de chamada do método 'getAgreementsWithProjects'
  it('should call getAgreementsWithProjects [/agreement-with-project]', async () => {
    const getAgreementsWithProjectsSpy = jest
      .spyOn(service, 'getAgreementsWithProjects')
      .mockResolvedValue([]);

    await controller.getAgreementsWithProjects();

    expect(getAgreementsWithProjectsSpy).toHaveBeenCalled();
  });

  // Teste de chamada do método 'register' com o DTO AgreementRegisterRequestDto e userId
  it('should call register with AgreementRegisterRequestDto and userId [/register]', async () => {
    const dto: AgreementRegisterRequestDto = { manager: user.userId } as AgreementRegisterRequestDto;

    const registerSpy = jest.spyOn(service, 'register').mockResolvedValue(mockAgreement);

    await controller.register(user, dto);

    expect(registerSpy).toHaveBeenCalledWith(dto);
    expect(dto.manager).toBe(user.userId);
  });

  // Teste de chamada do método 'findById' com o id correto
  it('should call findById with correct id [/:id]', async () => {
    const findByIdSpy = jest.spyOn(service, 'findById').mockResolvedValue(mockAgreement);

    const result = await controller.findById('123');

    expect(findByIdSpy).toHaveBeenCalledWith('123');
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);
  });

  // Teste de chamada do método 'findAgreementByUserId' com o id correto e roles
  it('should call findAgreementByUserId with correct id and roles [/by-user-id/:id]', async () => {
    const userRolesDto: UserTypeRequestDto = { roles: UserRolesEnum.geral };

    const findAgreementByUserIdSpy = jest
      .spyOn(service, 'findAgreementByUserId')
      .mockResolvedValue([mockAgreement]);

    const result = await controller.findAgreementByUserId('123', userRolesDto);

    expect(findAgreementByUserIdSpy).toHaveBeenCalledWith('123', userRolesDto.roles);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([mockAgreement]);
  });

  // Teste de chamada do método 'deleteById' com o id correto
  it('should call deleteById with correct id [/:id]', async () => {
    const deleteByIdSpy = jest
      .spyOn(service, 'deleteById')
      .mockResolvedValue(mockAgreement);

    const result = await controller.deleteById('123');

    expect(deleteByIdSpy).toHaveBeenCalledWith('123');
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);
  });

  // Teste de chamada do método 'update' com o id correto e DTO
  it('should call update with correct id and dto [/update/:id]', async () => {
    const dto: AgreementRegisterRequestDto = { manager: 'new-manager-id' } as AgreementRegisterRequestDto;

    const updateSpy = jest.spyOn(service, 'update').mockResolvedValue(mockAgreement);

    const result = await controller.update('123', dto);

    expect(updateSpy).toHaveBeenCalledWith('123', dto);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);
  });

  // Teste de chamada do método 'addWorkPlan' quando a ação é "add"
  it('should call addWorkPlan when action is "add" [/work-plan/:id/add]', async () => {
    const dto: WorkPlanWorkPlanRequestDto = { workPlanId: 'wp123' };

    const addWorkPlanSpy = jest
      .spyOn(service, 'addWorkPlan')
      .mockResolvedValue(mockAgreement);

    const result = await controller.handleWorkPlan('123', 'add', dto);

    expect(addWorkPlanSpy).toHaveBeenCalledWith('123', dto.workPlanId);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);
  });

  // Teste de chamada do método 'removeWorkPlan' quando a ação é "remove"
  it('should call removeWorkPlan when action is "remove" [/work-plan/:id/remove]', async () => {
    const dto: WorkPlanWorkPlanRequestDto = { workPlanId: 'wp123' };

    const removeWorkPlanSpy = jest
      .spyOn(service, 'removeWorkPlan')
      .mockResolvedValue(mockAgreement);

    const result = await controller.handleWorkPlan('123', 'remove', dto);

    expect(removeWorkPlanSpy).toHaveBeenCalledWith('123', dto.workPlanId);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);
  });
});
