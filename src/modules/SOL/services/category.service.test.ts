import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../services/category.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ResponseDto } from 'src/shared/dtos/response.dto';
import { ErrorManager } from '../../../shared/utils/error.manager';
import { CategoryRegisterDto } from '../dtos/category-register-request.dto';
import { CategoryController } from '../controllers/category.controller';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  const mockCategoryService = {
    register: jest.fn(),
    list: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a category', async () => {
        const dto: CategoryRegisterDto = { 
          category_name: 'Test Category',
          segment: 'Segment 1',
          identifier: 1,
          code: 100
        };
      
        const mockResponse = new ResponseDto(true, { id: '123', ...dto }, null);
      
        mockCategoryService.register.mockResolvedValue(mockResponse);
      
        const result = await controller.create({} as any, dto);
        
        // Ajuste a comparação para considerar a estrutura correta
        const expectedResponse = new ResponseDto(true, mockResponse, null);
      
        expect(result).toEqual(expectedResponse);  // Alterei aqui para comparar com o formato correto
        expect(mockCategoryService.register).toHaveBeenCalledWith(dto);
      });

    it('should handle errors during category creation', async () => {
      const dto: CategoryRegisterDto = { 
        category_name: 'Test Category',
        segment: 'Segment 1',
        identifier: 1,
        code: 100
      };
      const error = new Error('Some error');

      mockCategoryService.register.mockRejectedValue(error);

      // Ajuste o mock para disparar o erro sem retornar valor
      jest.spyOn(ErrorManager, 'createError').mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(controller.create({} as any, dto)).rejects.toThrowError('Some error');
      expect(mockCategoryService.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('list', () => {
    it('should return a list of categories', async () => {
      const mockCategories = [{ id: '1', category_name: 'Category 1', segment: 'Segment 1', identifier: 1, code: 100 }];
      const mockResponse = new ResponseDto(true, mockCategories, null);

      mockCategoryService.list.mockResolvedValue(mockCategories);

      const result = await controller.list();
      expect(result).toEqual(mockResponse);
      expect(mockCategoryService.list).toHaveBeenCalled();
    });

    it('should handle errors during fetching categories', async () => {
      const error = new Error('Some error');
      mockCategoryService.list.mockRejectedValue(error);

      jest.spyOn(ErrorManager, 'createError').mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(controller.list()).rejects.toThrowError('Some error');
      expect(mockCategoryService.list).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a category by ID', async () => {
      const mockCategory = { id: '1', category_name: 'Category 1', segment: 'Segment 1', identifier: 1, code: 100 };
      const mockResponse = new ResponseDto(true, mockCategory, null);

      mockCategoryService.getById.mockResolvedValue(mockCategory);

      const result = await controller.getById('1');
      expect(result).toEqual(mockResponse);
      expect(mockCategoryService.getById).toHaveBeenCalledWith('1');
    });

    it('should handle errors during fetching category by ID', async () => {
      const error = new Error('Some error');
      mockCategoryService.getById.mockRejectedValue(error);

      jest.spyOn(ErrorManager, 'createError').mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(controller.getById('1')).rejects.toThrowError('Some error');
      expect(mockCategoryService.getById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should successfully update a category', async () => {
      const dto: CategoryRegisterDto = { 
        category_name: 'Updated Category',
        segment: 'Updated Segment',
        identifier: 2,
        code: 101
      };
      const mockCategory = { id: '1', category_name: 'Updated Category', segment: 'Updated Segment', identifier: 2, code: 101 };
      const mockResponse = new ResponseDto(true, mockCategory, null);

      mockCategoryService.update.mockResolvedValue(mockCategory);

      const result = await controller.update('1', dto);
      expect(result).toEqual(mockResponse);
      expect(mockCategoryService.update).toHaveBeenCalledWith('1', dto);
    });

    it('should handle errors during category update', async () => {
      const dto: CategoryRegisterDto = { 
        category_name: 'Updated Category',
        segment: 'Updated Segment',
        identifier: 2,
        code: 101
      };
      const error = new Error('Some error');
      mockCategoryService.update.mockRejectedValue(error);

      jest.spyOn(ErrorManager, 'createError').mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(controller.update('1', dto)).rejects.toThrowError('Some error');
      expect(mockCategoryService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('delete', () => {
    it('should successfully delete a category', async () => {
      const mockResponse = new ResponseDto(true, null, null);

      mockCategoryService.deleteById.mockResolvedValue(null);

      const result = await controller.delete('1');
      expect(result).toEqual(mockResponse);
      expect(mockCategoryService.deleteById).toHaveBeenCalledWith('1');
    });

    it('should handle errors during category deletion', async () => {
      const error = new Error('Some error');
      mockCategoryService.deleteById.mockRejectedValue(error);

      jest.spyOn(ErrorManager, 'createError').mockImplementation(() => {
        throw new Error('Some error');
      });

      await expect(controller.delete('1')).rejects.toThrowError('Some error');
      expect(mockCategoryService.deleteById).toHaveBeenCalledWith('1');
    });
  });
});
