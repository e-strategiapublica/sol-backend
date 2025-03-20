import { Test, TestingModule } from '@nestjs/testing';

import { ClassesService } from '../services/classes.service';
import { ClassesModel } from '../models/database/classes.model';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { HttpException } from '@nestjs/common';
import { ClassesController } from '../controllers/classes.controller';

// Mock do modelo para simular as interações com o banco de dados
const mockClassesModel = {
  list: jest.fn(), // Mock da função de listagem
  verifyCodeExists: jest.fn(), // Mock da função que verifica a existência do código
  saveClass: jest.fn(), // Mock da função que salva uma nova classe
  updateClass: jest.fn(), // Mock da função que atualiza uma classe existente
  deleteById: jest.fn(), // Mock da função que deleta uma classe
};

describe('ClassesController', () => {
  let controller: ClassesController;
  let classesModel: ClassesModel;

  // Executado antes de cada teste, configura o ambiente de teste
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassesController], // Controller que será testado
      providers: [
        ClassesService, // Serviço de Classes necessário para o Controller
        {
          provide: ClassesModel, // Injeção de dependência do modelo
          useValue: mockClassesModel, // Usando o mock para simulação
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Mock do guard JWT para simular que sempre passa
      .useValue({
        canActivate: jest.fn(() => true), // Sempre retorna true, permitindo o acesso
      })
      .compile(); // Compila o módulo para rodar o teste

    controller = module.get<ClassesController>(ClassesController); // Obtém o controlador
    classesModel = module.get<ClassesModel>(ClassesModel); // Obtém o modelo de dados
  });

  // Teste básico para garantir que o controller está definido corretamente
  it('should be defined', () => {
    expect(controller).toBeDefined(); // Verifica se o controlador foi corretamente instanciado
  });

  // Testes para o método 'list' do controlador
  describe('list', () => {
    it('should return a list of classes', async () => {
      const result = [{ id: '1', name: 'Class 1' }]; // Dados simulados
      mockClassesModel.list.mockResolvedValue(result); // Mock da função list para retornar os dados simulados

      expect(await controller.list()).toEqual({ data: result }); // Verifica se o retorno é igual ao esperado
      expect(mockClassesModel.list).toHaveBeenCalled(); // Verifica se a função list foi chamada
    });
  });

  // Testes para o método 'register' (cadastrar) do controlador
  describe('register', () => {
    it('should create a new class', async () => {
      const dto = { code: '123', name: 'New Class' }; // Dados de entrada
      mockClassesModel.verifyCodeExists.mockResolvedValue(undefined); // Simula que o código não existe
      mockClassesModel.saveClass.mockResolvedValue(undefined); // Simula que a classe foi salva com sucesso

      expect(await controller.register(dto)).toEqual({ message: 'Created' }); // Verifica se a resposta é a esperada
      expect(mockClassesModel.verifyCodeExists).toHaveBeenCalledWith(dto.code); // Verifica se a função verifyCodeExists foi chamada com o código correto
      expect(mockClassesModel.saveClass).toHaveBeenCalledWith(dto); // Verifica se a função saveClass foi chamada com os dados corretos
    });

    it('should throw error if code already exists', async () => {
      const dto = { code: '123', name: 'New Class' }; // Dados de entrada
      mockClassesModel.verifyCodeExists.mockRejectedValue(new HttpException('Code exists', 400)); // Simula erro ao verificar código existente

      // Verifica se o erro esperado é lançado
      await expect(controller.register(dto)).rejects.toThrow(HttpException);
    });
  });

  // Testes para o método 'update' (atualizar) do controlador
  describe('update', () => {
    it('should update a class', async () => {
      const dto = { name: 'Updated Class' }; // Dados de atualização
      const id = '1'; // ID da classe a ser atualizada
      mockClassesModel.updateClass.mockResolvedValue(undefined); // Simula sucesso na atualização

      expect(await controller.update(id, dto)).toEqual({ message: 'Updated' }); // Verifica se a resposta é a esperada
      expect(mockClassesModel.updateClass).toHaveBeenCalledWith(id, dto); // Verifica se a função updateClass foi chamada corretamente
    });
  });

  // Testes para o método 'deleteById' (deletar por ID) do controlador
  describe('deleteById', () => {
    it('should delete a class', async () => {
      const id = '1'; // ID da classe a ser deletada
      mockClassesModel.deleteById.mockResolvedValue(undefined); // Simula sucesso na exclusão

      await controller.deleteById(id); // Chama o método de exclusão
      expect(mockClassesModel.deleteById).toHaveBeenCalledWith(id); // Verifica se a função deleteById foi chamada corretamente
    });
  });
});
