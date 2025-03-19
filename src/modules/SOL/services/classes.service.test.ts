import { Test, TestingModule } from '@nestjs/testing';

import { ClassesService } from '../services/classes.service';
import { ClassesModel } from '../models/database/classes.model';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { HttpException } from '@nestjs/common';
import { ClassesController } from '../controllers/classes.controller';

// Mock do modelo para simular as interações com o banco de dados
const mockClassesModel = {
  list: jest.fn(),
  verifyCodeExists: jest.fn(),
  saveClass: jest.fn(),
  updateClass: jest.fn(),
  deleteById: jest.fn(),
};

describe('ClassesController', () => {
  let controller: ClassesController;
  let classesModel: ClassesModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassesController],
      providers: [
        ClassesService,
        {
          provide: ClassesModel,
          useValue: mockClassesModel,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Mock do guard JWT
      .useValue({
        canActivate: jest.fn(() => true), // Simula que o guard sempre passa
      })
      .compile();

    controller = module.get<ClassesController>(ClassesController);
    classesModel = module.get<ClassesModel>(ClassesModel);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should return a list of classes', async () => {
      const result = [{ id: '1', name: 'Class 1' }];
      mockClassesModel.list.mockResolvedValue(result);

      expect(await controller.list()).toEqual({ data: result });
      expect(mockClassesModel.list).toHaveBeenCalled();
    });
  });

  describe('register', () => {
    it('should create a new class', async () => {
      const dto = { code: '123', name: 'New Class' };
      mockClassesModel.verifyCodeExists.mockResolvedValue(undefined); // Não há erro ao verificar código
      mockClassesModel.saveClass.mockResolvedValue(undefined); // Sucesso ao salvar a classe

      expect(await controller.register(dto)).toEqual({ message: 'Created' });
      expect(mockClassesModel.verifyCodeExists).toHaveBeenCalledWith(dto.code);
      expect(mockClassesModel.saveClass).toHaveBeenCalledWith(dto);
    });

    it('should throw error if code already exists', async () => {
      const dto = { code: '123', name: 'New Class' };
      mockClassesModel.verifyCodeExists.mockRejectedValue(new HttpException('Code exists', 400));

      await expect(controller.register(dto)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a class', async () => {
      const dto = { name: 'Updated Class' };
      const id = '1';
      mockClassesModel.updateClass.mockResolvedValue(undefined); // Sucesso na atualização

      expect(await controller.update(id, dto)).toEqual({ message: 'Updated' });
      expect(mockClassesModel.updateClass).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('deleteById', () => {
    it('should delete a class', async () => {
      const id = '1';
      mockClassesModel.deleteById.mockResolvedValue(undefined); // Sucesso na exclusão

      await controller.deleteById(id);
      expect(mockClassesModel.deleteById).toHaveBeenCalledWith(id);
    });
  });
});
