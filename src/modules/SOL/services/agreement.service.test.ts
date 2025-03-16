import { Test, TestingModule } from '@nestjs/testing';
import { JwtPayload } from "src/shared/interfaces/jwt-payload.interface";
import { AgreementRegisterRequestDto } from "../dtos/agreement-register-request.dto";
import { UserTypeRequestDto } from "../dtos/user-type-request.dto";
import { AgreementStatusEnum } from "../enums/agreement-status.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { UserTypeEnum } from "../enums/user-type.enum";
import { AgreementInterface } from "../interfaces/agreement.interface";
import { AssociationModel } from "../models/association.model";
import { ProjectModel } from "../models/project.model";
import { UserModel } from "../models/user.model";
import { AgreementController } from "../controllers/agreement.controller";
import { AgreementService } from "./agreement.service"
import { WorkPlanWorkPlanRequestDto } from '../dtos/work-plan-add-work-plan-request.dto';

describe('AgreementController', () => {
  let controller: AgreementController;
  let service: AgreementService;

 beforeEach(async () => {
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
        }
      ],
    }).compile();

    controller = module.get<AgreementController>(AgreementController);
    service = module.get<AgreementService>(AgreementService);
  });

  // Teste para findAgreementsWithOutProject
  it('should call findAgreementsWithOutProject when withoutProject=true [/]', async () => {
    const findAgreementsWithOutProjectSpy = jest
      .spyOn(service, 'findAgreementsWithOutProject')
      .mockResolvedValue([]);

    await controller.get('true');

    expect(findAgreementsWithOutProjectSpy).toHaveBeenCalled();
  });

  // Teste para findAll
  it('should call findAll when withoutProject is false or undefined [/]', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue([]);

    await controller.get();
    await controller.get('false');

    expect(findAllSpy).toHaveBeenCalledTimes(2);
  });

  // Teste para findForAssociation
  it('should call findForAssociation with userId from JwtPayload [/for-association]', async () => {
    const user: JwtPayload = { 
      userId: '123', 
      email: 'test@example.com', 
      type: UserTypeEnum.administrador, 
      tfaRegistered: true, 
      tfaAuthenticate: true 
    };

    const findForAssociationSpy = jest
      .spyOn(service, 'findForAssociation')
      .mockResolvedValue([]);

    await controller.getForAssociation(user);

    expect(findForAssociationSpy).toHaveBeenCalledWith('123');
  });

  // Teste para getAgreementsWithProjects
  it('should call getAgreementsWithProjects [/agreement-with-project]', async () => {
    const getAgreementsWithProjectsSpy = jest
      .spyOn(service, 'getAgreementsWithProjects')
      .mockResolvedValue([]);

    await controller.getAgreementsWithProjects();

    expect(getAgreementsWithProjectsSpy).toHaveBeenCalled();
  });

  // Teste para register
  it('should call register with AgreementRegisterRequestDto and userId [/register]', async () => {
    const user: JwtPayload = {
      userId: '123',
      email: 'test@example.com',
      type: UserTypeEnum.administrador,
      tfaRegistered: true,
      tfaAuthenticate: true,
    };

    const dto: AgreementRegisterRequestDto = { manager: '' } as AgreementRegisterRequestDto;

    const mockAgreement: AgreementInterface = {
      register_number: 'ABC123',
      register_object: 'Agreement Test',
      status: AgreementStatusEnum.inExecution, 
      city: 'Sample City',
      states: 'SP',
      value: 10000,
      validity_date: new Date(),
      signature_date: new Date(),
      association: {} as any,
      project: {} as any,
      manager: {} as any,
      workPlan: [],
      project_id: {} as any,
      reviewer: {} as any,
    };

    const registerSpy = jest.spyOn(service, 'register').mockResolvedValue(mockAgreement);

    await controller.register(user, dto);

    expect(dto.manager).toBe(user.userId);
    expect(registerSpy).toHaveBeenCalledWith(dto);
  });

  // Teste para findById
  it('should call findById with correct id [/:id]', async () => {
    const id = '123';
    const mockAgreement: AgreementInterface = {
      register_number: id,
      register_object: 'Test Object',
      status: AgreementStatusEnum.concluded, 
      city: 'São Paulo',
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

    const findByIdSpy = jest.spyOn(service, 'findById').mockResolvedValue(mockAgreement);

    const result = await controller.findById(id);

    expect(findByIdSpy).toHaveBeenCalledWith(id);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);
  });

  // Teste para findAgreementByUserId
  it('should call findAgreementByUserId with correct id and roles [/by-user-id/:id]', async () => {
    const id = '123';
    const roles: UserRolesEnum = UserRolesEnum.geral;
    const userRolesDto: UserTypeRequestDto = { roles };

    const mockAgreement: AgreementInterface = {
      register_number: id,
      register_object: 'Test Object',
      status: AgreementStatusEnum.concluded,
      city: 'São Paulo',
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

    const findAgreementByUserIdSpy = jest
      .spyOn(service, 'findAgreementByUserId')
      .mockResolvedValue([mockAgreement]);

    const result = await controller.findAgreementByUserId(id, userRolesDto);

    expect(findAgreementByUserIdSpy).toHaveBeenCalledWith(id, userRolesDto.roles);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([mockAgreement]);
  });

  // Teste para deleteById
  it('should call deleteById with correct id [/:id]', async () => {
    const id = '123'; // ID do objeto que será deletado
  
    // Mock de um objeto AgreementInterface que será retornado após a exclusão
    const mockAgreement: AgreementInterface = {
      register_number: id,
      register_object: 'Test Object',
      status: AgreementStatusEnum.concluded,
      city: 'São Paulo',
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
  
    // Criando um spy na função deleteById do serviço
    const deleteByIdSpy = jest
      .spyOn(service, 'deleteById')
      .mockResolvedValue(mockAgreement); // Retorna um objeto AgreementInterface após deleção
  
    const result = await controller.deleteById(id); // Chama o controller para deletar o item
  
    // Verifica se a função deleteById foi chamada com o ID correto
    expect(deleteByIdSpy).toHaveBeenCalledWith(id);
  
    // Verifica se o resultado retornado é o esperado
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement); // Verifica os dados retornados
  });

  it('should call update with correct id and dto [/update/:id]', async () => {
    const id = '123'; // ID do acordo que será atualizado
    const dto: AgreementRegisterRequestDto = {
      manager: 'new-manager-id',
    } as AgreementRegisterRequestDto; // DTO com os dados para atualização
  
    // Mock do objeto AgreementInterface retornado após atualização
    const mockAgreement: AgreementInterface = {
      register_number: id,
      register_object: 'Updated Agreement',
      status: AgreementStatusEnum.inExecution,
      city: 'São Paulo',
      states: 'SP',
      value: 20000,
      validity_date: new Date(),
      signature_date: new Date(),
      association: {} as AssociationModel,
      project: {} as ProjectModel,
      manager: {} as UserModel,
      workPlan: [],
      project_id: {} as ProjectModel,
      reviewer: {} as UserModel,
    };
  
    // Criando um spy na função update do serviço
    const updateSpy = jest
      .spyOn(service, 'update')
      .mockResolvedValue(mockAgreement); // Retorna o objeto AgreementInterface atualizado
  
    const result = await controller.update(id, dto); // Chama o controller para atualizar o acordo
  
    // Verifica se a função update foi chamada com o ID e o DTO corretos
    expect(updateSpy).toHaveBeenCalledWith(id, dto);
  
    // Verifica se o resultado retornado é o esperado
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement); // Verifica os dados retornados
  });
  it('should call addWorkPlan when action is "add" [/work-plan/:id/add]', async () => {
    const id = '123';
    const action = 'add';
    const dto: WorkPlanWorkPlanRequestDto = { workPlanId: 'wp123' };

    const mockAgreement: AgreementInterface = {
      register_number: 'ABC123',
      register_object: 'Agreement Test',
      status: AgreementStatusEnum.inExecution, 
      city: 'Sample City',
      states: 'SP',
      value: 10000,
      validity_date: new Date(),
      signature_date: new Date(),
      association: {} as any,
      project: {} as any,
      manager: {} as any,
      workPlan: [],
      project_id: {} as any,
      reviewer: {} as any,
    };

    const addWorkPlanSpy = jest
      .spyOn(service, 'addWorkPlan')
      .mockResolvedValue(mockAgreement);  // Retorna um objeto AgreementInterface

    const result = await controller.handleWorkPlan(id, action, dto);

    expect(addWorkPlanSpy).toHaveBeenCalledWith(id, dto.workPlanId);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);  // Verifica se o objeto retornado está correto
  });

it('should call removeWorkPlan when action is "remove" [/work-plan/:id/remove]', async () => {
    const id = '123';
    const action = 'remove';
    const dto: WorkPlanWorkPlanRequestDto = { workPlanId: 'wp123' };

    const mockAgreement: AgreementInterface = {
      register_number: 'ABC123',
      register_object: 'Agreement Test',
      status: AgreementStatusEnum.inExecution, 
      city: 'Sample City',
      states: 'SP',
      value: 10000,
      validity_date: new Date(),
      signature_date: new Date(),
      association: {} as any,
      project: {} as any,
      manager: {} as any,
      workPlan: [],
      project_id: {} as any,
      reviewer: {} as any,
    };

    const removeWorkPlanSpy = jest
      .spyOn(service, 'removeWorkPlan')
      .mockResolvedValue(mockAgreement);  // Retorna um objeto AgreementInterface

    const result = await controller.handleWorkPlan(id, action, dto);

    expect(removeWorkPlanSpy).toHaveBeenCalledWith(id, dto.workPlanId);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockAgreement);  // Verifica se o objeto retornado está correto
  });


});
