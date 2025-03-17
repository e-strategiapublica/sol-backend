import { Test, TestingModule } from '@nestjs/testing';
import { AllotmentService } from '../services/allotment.service';
import { ResponseDto } from 'src/shared/dtos/response.dto';
import { HttpStatus, HttpException } from '@nestjs/common';
import { ItemRequestDto } from '../dtos/item-register-request.dto';
import { AllotUpdateStatusRequestDto } from '../dtos/allotment-update-status-request.dto';
import { AllotmentController } from '../controllers/allotment.controller';
import { AllotmentStatusEnum } from '../enums/allotment-status.enum';

describe('AllotmentController', () => {
  let controller: AllotmentController;
  let allotmentService: AllotmentService;

  const mockAllotmentService = {
    list: jest.fn(),
    listById: jest.fn(),
    updateItem: jest.fn(),
    updateStatus: jest.fn(),
    downloadAllotmentById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllotmentController],
      providers: [
        { provide: AllotmentService, useValue: mockAllotmentService },
      ],
    }).compile();

    controller = module.get<AllotmentController>(AllotmentController);
    allotmentService = module.get<AllotmentService>(AllotmentService);
  });

  describe('GET /allotments', () => {
    it('should return a list of allotments', async () => {
      const mockResponse = { data: ['item1', 'item2'] };
      mockAllotmentService.list.mockResolvedValue(mockResponse);

      const result = await controller.list();
      expect(result).toEqual(new ResponseDto(true, mockResponse, null));
    });

    it('should throw an error when service fails', async () => {
      const mockError = new Error('Something went wrong');
      mockAllotmentService.list.mockRejectedValue(mockError);

      try {
        await controller.list();
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('GET /allotments/:id', () => {
    it('should return a single allotment by id', async () => {
      const mockResponse = { id: '1', name: 'Test Allotment' };
      mockAllotmentService.listById.mockResolvedValue(mockResponse);

      const result = await controller.getAllotById('1');
      expect(result).toEqual(new ResponseDto(true, mockResponse, null));
    });

    it('should throw an error when service fails', async () => {
      const mockError = new Error('Allotment not found');
      mockAllotmentService.listById.mockRejectedValue(mockError);

      try {
        await controller.getAllotById('1');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('POST /allotments/:id/items', () => {
    it('should add a new item to an allotment', async () => {
      const mockResponse = { id: '1', item: 'New Item' };
      mockAllotmentService.updateItem.mockResolvedValue(mockResponse);

      const dto: ItemRequestDto = {
        group: 'Group A',
        item: 'New Item',
        quantity: '10',
        unitMeasure: 'kg',
        specification: 'High quality',
      };

      const result = await controller.addItem('1', dto);
      expect(result).toEqual(new ResponseDto(true, mockResponse, null));
    });

    it('should throw an error when service fails', async () => {
      const mockError = new Error('Failed to add item');
      mockAllotmentService.updateItem.mockRejectedValue(mockError);

      const dto: ItemRequestDto = {
        group: 'Group A',
        item: 'New Item',
        quantity: '10',
        unitMeasure: 'kg',
        specification: 'High quality',
      };

      try {
        await controller.addItem('1', dto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('PUT /allotments/:id/status', () => {
    it('should update the status of an allotment', async () => {
      const mockResponse = { status: 'Updated' };
      mockAllotmentService.updateStatus.mockResolvedValue(mockResponse);

      const dto: AllotUpdateStatusRequestDto = { status: AllotmentStatusEnum.aberta };
      const result = await controller.updateStatus('1', dto);
      expect(result).toEqual(new ResponseDto(true, mockResponse, null));
    });

    it('should throw an error when service fails', async () => {
      const mockError = new Error('Failed to update status');
      mockAllotmentService.updateStatus.mockRejectedValue(mockError);

      const dto: AllotUpdateStatusRequestDto = { status: AllotmentStatusEnum.aberta };
      try {
        await controller.updateStatus('1', dto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('GET /allotments/:id/download', () => {
    it('should download the allotment file', async () => {
      const mockResponse = { file: 'fileData' };
      mockAllotmentService.downloadAllotmentById.mockResolvedValue(mockResponse);

      const result = await controller.download('1');
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when service fails', async () => {
      const mockError = new Error('Failed to download file');
      mockAllotmentService.downloadAllotmentById.mockRejectedValue(mockError);

      try {
        await controller.download('1');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
