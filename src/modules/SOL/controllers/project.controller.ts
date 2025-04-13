import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { FuncoesGuard } from "src/shared/guards/funcoes.guard";
import { UserTypeEnum } from "../enums/user-type.enum";
import { Funcoes } from "src/shared/decorators/function.decorator";
import { ProjectService } from "../services/project.service";
import { ProjectRegisterRequestDto } from "../dtos/project-register-request.dto";
import { ErrorManager } from "../../../shared/utils/error.manager";
import { ProjectModel } from "../models/project.model";

@ApiTags("projetos")
@Controller("projetos")
export class ProjectController {
  private readonly _logger = new Logger(ProjectController.name);

  constructor(private _projectService: ProjectService) {}

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(
    UserTypeEnum.administrador,
    UserTypeEnum.project_manager,
    UserTypeEnum.associacao,
  )
  async get() {
    try {
      const response = await this._projectService.findAll();

      return new ResponseDto(true, response, null);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post("register")
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.administrador, UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async register(
    @Body() dto: ProjectRegisterRequestDto,
  ): Promise<ProjectModel> {
    return this._projectService.register(dto);
  }

  @Get("/:id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(
    UserTypeEnum.administrador,
    UserTypeEnum.project_manager,
    UserTypeEnum.associacao,
  )
  @ApiBearerAuth()
  async findById(@Param("id") id: string) {
    try {
      const response = await this._projectService.findById(id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("find-projects-for-associationId/:id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.associacao, UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async findAllProjectsForAssociationId(@Param("id") id: string) {
    try {
      const response =
        await this._projectService.findAllProjectsForAssociationId(id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("find-projects-for-viewer/:id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.associacao, UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async findAllProjectsByViewerId(@Param("id") id: string) {
    try {
      const response = await this._projectService.findAllProjectsByViewerId(id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("find-projects-for-reviewer/:id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.associacao, UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async findAllProjectsByReviewerId(@Param("id") id: string) {
    try {
      const response =
        await this._projectService.findAllProjectsByReviewerId(id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("find-projects-for-manager/:id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.associacao, UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async findAllProjectsByManagerId(@Param("id") id: string) {
    try {
      const response =
        await this._projectService.findAllProjectsByManagerId(id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete("/:id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, FuncoesGuard)
  @Funcoes(UserTypeEnum.administrador, UserTypeEnum.project_manager)
  @ApiBearerAuth()
  async deleteById(@Param("id") id: string) {
    try {
      const response = await this._projectService.deleteById(id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
