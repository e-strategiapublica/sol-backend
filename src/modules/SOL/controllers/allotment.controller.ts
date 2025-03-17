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

@ApiTags("allotments")
@Controller("allotments")
export class AllotmentController {
  private readonly logger = new Logger(AllotmentController.name);

  constructor(private readonly allotmentService: AllotmentService) {}

  private handleError(error: any) {
    this.logger.error(error.message);
    throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async list() {
    try {
      const response = await this.allotmentService.list();
      return new ResponseDto(true, response, null);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(":id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllotById(@Param("id") id: string) {
    try {
      const response = await this.allotmentService.listById(id);
      return new ResponseDto(true, response, null);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Post(":id/items")
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao)
  @ApiBearerAuth()
  async addItem(@Param("id") id: string, @Body() dto: ItemRequestDto) {
    try {
      const response = await this.allotmentService.updateItem(id, dto);
      return new ResponseDto(true, response, null);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(":id/status")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateStatus(@Param("id") id: string, @Body() dto: AllotUpdateStatusRequestDto) {
    try {
      const response = await this.allotmentService.updateStatus(id, dto.status);
      return new ResponseDto(true, response, null);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(":id/file")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async download(@Param("id") id: string) {
    try {
      return await this.allotmentService.downloadAllotmentById(id);
    } catch (error) {
      this.handleError(error);
    }
  }
}
