import { Test, TestingModule } from '@nestjs/testing';
import { AgreementService } from '../services/agreement.service';
import { AgreementController } from '../controllers/agreement.controller';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { UserTypeEnum } from '../enums/user-type.enum';
import { AgreementRegisterRequestDto } from '../dtos/agreement-register-request.dto';
import { AgreementInterface } from '../interfaces/agreement.interface';
import { AgreementStatusEnum } from '../enums/agreement-status.enum';

describe('AgreementController', () => {
  let controller: AgreementController;
  let service: AgreementService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
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
          },
        },
      ],
    }).compile();

    controller = module.get<AgreementController>(AgreementController);
    service = module.get<AgreementService>(AgreementService);
  });

  it('should call findAgreementsWithOutProject when withoutProject=true [/]', async () => {
    const findAgreementsWithOutProjectSpy = jest
      .spyOn(service, 'findAgreementsWithOutProject')
      .mockResolvedValue([]);

    await controller.get('true');

    expect(findAgreementsWithOutProjectSpy).toHaveBeenCalled();
  });

  it('should call findAll when withoutProject is false or undefined [/]', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue([]);

    await controller.get();
    await controller.get('false');

    expect(findAllSpy).toHaveBeenCalledTimes(2);
  });

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

  it('should call getAgreementsWithProjects [/agreement-with-project]', async () => {
    const getAgreementsWithProjectsSpy = jest
      .spyOn(service, 'getAgreementsWithProjects')
      .mockResolvedValue([]);

    await controller.getAgreementsWithProjects();

    expect(getAgreementsWithProjectsSpy).toHaveBeenCalled();
  });

  it('should call register with AgreementRegisterRequestDto and userId [/register]', async () => {
    const user: JwtPayload = {
      userId: '123',
      email: 'test@example.com',
      type: UserTypeEnum.administrador,
      tfaRegistered: true,
      tfaAuthenticate: true,
    };
    
    const dto: AgreementRegisterRequestDto = {
      manager: '',
    } as AgreementRegisterRequestDto;
    
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
});