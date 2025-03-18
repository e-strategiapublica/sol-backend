import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { ConfigService } from '@nestjs/config';
import { ResponseDto } from 'src/shared/dtos/response.dto';
import { AuthenticationController } from '../controllers/authentication.controller';
import { UserTypeEnum } from '../enums/user-type.enum';

// Descreve o conjunto de testes para o AuthenticationController
describe('AuthenticationController', () => {
  let controller: AuthenticationController;  // Instância do controller
  let authenticationService: AuthenticationService;  // Instância do serviço de autenticação
  let userService: UserService;  // Instância do serviço de usuário

  // Configura o ambiente de testes antes de cada teste
  beforeEach(async () => {
    // Criação do módulo de testes com os controladores e provedores necessários
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,  // Mock do AuthenticationService
          useValue: {
            authenticate: jest.fn(),  // Mock do método authenticate
            logoutUser: jest.fn(),  // Mock do método logoutUser
          },
        },
        {
          provide: UserService,  // Mock do UserService
          useValue: {
            getById: jest.fn(),  // Mock do método getById
          },
        },
        {
          provide: ConfigService,  // Mock do ConfigService
          useValue: {},
        },
      ],
    }).compile();  // Compila o módulo de testes

    // Obtém as instâncias dos serviços e controller
    controller = module.get<AuthenticationController>(AuthenticationController);
    authenticationService = module.get<AuthenticationService>(AuthenticationService);
    userService = module.get<UserService>(UserService);
  });

  // Descreve os testes para o método 'authenticate'
  describe('authenticate', () => {
    it('should return a success response for valid credentials', async () => {
      // Dados de entrada para a autenticação
      const dto = { 
        email: 'test@example.com', 
        password: 'password' 
      }; 

      // Resultado esperado para credenciais válidas
      const expectedResult = new ResponseDto(true, { token: 'fakeToken' }, null);

      // Mock do método authenticate para simular sucesso
      authenticationService.authenticate = jest.fn().mockResolvedValue({ token: 'fakeToken' });

      // Chama o método 'authenticate' do controller
      const result = await controller.authenticate(dto);

      // Verifica se o resultado é o esperado
      expect(result).toEqual(expectedResult);
      expect(authenticationService.authenticate).toHaveBeenCalledWith(dto);  // Verifica se o método foi chamado corretamente
    });

    it('should throw HttpException if authentication fails', async () => {
      // Dados de entrada com credenciais erradas
      const dto = { 
        email: 'test@example.com', 
        password: 'wrongPassword' 
      };

      // Mock do método authenticate para simular falha
      authenticationService.authenticate = jest.fn().mockRejectedValue(new Error('Invalid credentials'));

      try {
        // Chama o método 'authenticate' do controller
        await controller.authenticate(dto);
      } catch (error) {
        // Verifica se a exceção foi lançada corretamente
        expect(error.response).toEqual(new ResponseDto(false, null, ['Invalid credentials']));
      }
    });
  });

  // Descreve os testes para o método 'logout'
  describe('logout', () => {
    it('should return a success response for a valid logout', async () => {
      // Dados do usuário que vai fazer o logout
      const user = { 
        userId: '1', 
        email: 'test@example.com',   
        type: UserTypeEnum.administrador,  
        tfaRegistered: false,        
        tfaAuthenticate: false       
      };

      // Resultado esperado para o logout
      const expectedResult = new ResponseDto(true, null, null);

      // Mock do método logoutUser para simular sucesso
      authenticationService.logoutUser = jest.fn().mockResolvedValue(null);

      // Chama o método 'logout' do controller
      const result = await controller.logout({ user });

      // Verifica se o resultado é o esperado
      expect(result).toEqual(expectedResult);
      expect(authenticationService.logoutUser).toHaveBeenCalledWith(user.userId);  // Verifica se o método foi chamado corretamente
    });
  });

  // Descreve os testes para o método 'authenticated'
  describe('authenticated', () => {
    it('should return a success response for a valid authenticated user', async () => {
      // Dados do usuário autenticado
      const user = {
        userId: '1',              
        email: 'test@example.com', 
        type: UserTypeEnum.administrador, 
        tfaRegistered: false,       
        tfaAuthenticate: false      
      };

      // Resultado esperado para um usuário autenticado
      const expectedResult = new ResponseDto(true, null, null);

      // Mock do método getById para simular recuperação de dados do usuário
      userService.getById = jest.fn().mockResolvedValue(user); 

      // Chama o método 'authenticated' do controller
      const result = await controller.authenticated({ user });

      // Verifica se o resultado é o esperado
      expect(result).toEqual(expectedResult);
      expect(userService.getById).toHaveBeenCalledWith(user.userId);  // Verifica se o método foi chamado corretamente
    });
  });  
});