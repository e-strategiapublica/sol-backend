import { 
  Body, 
  Controller, 
  Get, 
  HttpCode, 
  HttpException, 
  HttpStatus, 
  Logger, 
  Param, 
  Put, 
  Patch, 
  Post, 
  UseGuards 
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { AllotmentService } from "../services/allotment.service";
import { ItemRequestDto } from "../dtos/item-register-request.dto";
import { AllotUpdateStatusRequestDto } from "../dtos/allotment-update-status-request.dto";
import { FuncoesGuard } from "src/shared/guards/funcoes.guard";
import { Funcoes } from "src/shared/decorators/function.decorator";
import { UserTypeEnum } from "../enums/user-type.enum";

// Definindo o controller para o recurso "allotments"
@ApiTags("allotments") // Adiciona tag para Swagger
@Controller("allotments") // Define a rota base para o controller
export class AllotmentController {
  private readonly logger = new Logger(AllotmentController.name); // Logger para registrar eventos

  // Injeta o serviço AllotmentService para manipular a lógica de negócios
  constructor(private readonly allotmentService: AllotmentService) {}

  // Método para tratamento de erros, registrando o erro e lançando uma exceção HTTP
  private handleError(error: any) {
    this.logger.error(error.message); // Registra o erro
    throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST); // Lança exceção com mensagem de erro
  }

  // Método para listar todos os allotments
  @Get()
  @HttpCode(200) // Define o código HTTP de resposta como 200
  @UseGuards(JwtAuthGuard) // Protege a rota com o guarda de autenticação JWT
  @ApiBearerAuth() // Indica que a autenticação usa Bearer Token
  async list() {
    try {
      const response = await this.allotmentService.list(); // Chama o serviço para listar allotments
      return new ResponseDto(true, response, null); // Retorna sucesso com dados
    } catch (error) {
      this.handleError(error); // Trata qualquer erro ocorrido
    }
  }

  // Método para obter um allotment específico pelo id
  @Get(":id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllotById(@Param("id") id: string) {
    try {
      const response = await this.allotmentService.listById(id); // Chama o serviço para buscar o allotment por id
      return new ResponseDto(true, response, null); // Retorna o allotment encontrado
    } catch (error) {
      this.handleError(error); // Trata qualquer erro ocorrido
    }
  }

  // Método para adicionar um item a um allotment
  @Post(":id/items")
  @HttpCode(201) // Define o código HTTP de resposta como 201 (Created)
  @UseGuards(JwtAuthGuard, FuncoesGuard) // Protege a rota com autenticação JWT e guarda de permissões
  @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao) // Verifica as permissões de usuário (Administrador ou Associação)
  @ApiBearerAuth()
  async addItem(@Param("id") id: string, @Body() dto: ItemRequestDto) {
    try {
      const response = await this.allotmentService.updateItem(id, dto); // Chama o serviço para adicionar o item ao allotment
      return new ResponseDto(true, response, null); // Retorna sucesso com dados
    } catch (error) {
      this.handleError(error); // Trata qualquer erro ocorrido
    }
  }

  // Método para atualizar o status de um allotment
  @Patch(":id/status")
  @HttpCode(200) // Define o código HTTP de resposta como 200
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateStatus(@Param("id") id: string, @Body() dto: AllotUpdateStatusRequestDto) {
    try {
      const response = await this.allotmentService.updateStatus(id, dto.status); // Chama o serviço para atualizar o status do allotment
      return new ResponseDto(true, response, null); // Retorna sucesso com dados
    } catch (error) {
      this.handleError(error); // Trata qualquer erro ocorrido
    }
  }

  // Método para baixar um arquivo relacionado ao allotment
  @Get(":id/file")
  @HttpCode(200) // Define o código HTTP de resposta como 200
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async download(@Param("id") id: string) {
    try {
      return await this.allotmentService.downloadAllotmentById(id); // Chama o serviço para baixar o arquivo do allotment
    } catch (error) {
      this.handleError(error); // Trata qualquer erro ocorrido
    }
  }
}
