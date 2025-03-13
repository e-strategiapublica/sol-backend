import { Test, TestingModule } from '@nestjs/testing';

import { AgreementService } from '../services/agreement.service';
import { AgreementController } from '../controllers/agreement.controller';

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
          },
        },
      ],
    }).compile();

    controller = module.get<AgreementController>(AgreementController);
    service = module.get<AgreementService>(AgreementService);
  });

  it('should call findAgreementsWithOutProject when withoutProject=true', async () => {
    const findAgreementsWithOutProjectSpy = jest.spyOn(service, 'findAgreementsWithOutProject').mockResolvedValue([]);

    await controller.get('true');

    expect(findAgreementsWithOutProjectSpy).toHaveBeenCalled();
  });

  it('should call findAll when withoutProject is false or undefined', async () => {
    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue([]);

    await controller.get();
    await controller.get('false');

    expect(findAllSpy).toHaveBeenCalledTimes(2);
  });
});
