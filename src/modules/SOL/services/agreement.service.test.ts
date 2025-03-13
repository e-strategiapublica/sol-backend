import { Test, TestingModule } from '@nestjs/testing';
import { AgreementService } from '../services/agreement.service';
import { AgreementController } from '../controllers/agreement.controller';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { UserTypeEnum } from '../enums/user-type.enum';

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
          },
        },
      ],
    }).compile();

    controller = module.get<AgreementController>(AgreementController);
    service = module.get<AgreementService>(AgreementService);
  });

  it('should call findAgreementsWithOutProject when withoutProject=true', async () => {
    const findAgreementsWithOutProjectSpy = jest
      .spyOn(service, 'findAgreementsWithOutProject')
      .mockResolvedValue([]);

    await controller.get('true');

    expect(findAgreementsWithOutProjectSpy).toHaveBeenCalled();
  });

  it('should call findAll when withoutProject is false or undefined', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue([]);

    await controller.get();
    await controller.get('false');

    expect(findAllSpy).toHaveBeenCalledTimes(2);
  });

  it('should call findForAssociation with userId from JwtPayload', async () => {
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
});