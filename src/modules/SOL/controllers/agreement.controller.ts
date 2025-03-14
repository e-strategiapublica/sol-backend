import {
  Body,
  Query,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags, ApiQuery } from "@nestjs/swagger";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { AgreementRegisterRequestDto } from "../dtos/agreement-register-request.dto";
import { AgreementService } from "../services/agreement.service";
import { FuncoesGuard } from "src/shared/guards/funcoes.guard";
import { UserTypeEnum } from "../enums/user-type.enum";
import { Funcoes } from "src/shared/decorators/function.decorator";
import { WorkPlanWorkPlanRequestDto } from "../dtos/work-plan-add-work-plan-request.dto";
import { JwtPayload } from "src/shared/interfaces/jwt-payload.interface";
import { UserTypeRequestDto } from "../dtos/user-type-request.dto";
import { applyDecorators, createParamDecorator, ExecutionContext } from "@nestjs/common";

// Decorator para reduzir repetição de autenticação e autorização
export function AuthRoles(...roles: UserTypeEnum[]) {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JwtAuthGuard, FuncoesGuard),
    Funcoes(...roles)
  );
}

// Decorator para obter usuário autenticado
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

@ApiTags("conveios")
@Controller("convenios")
export class AgreementController {
  private readonly _logger = new Logger(AgreementController.name)

  constructor(private _airdropService: AgreementService) { }
  

  private async handleRequest<T>(fn: () => Promise<T>): Promise<ResponseDto> {
    try {
      const response = await fn();
      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);
      throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST);
    }
  }

  // @Get()
  // @HttpCode(200)
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, FuncoesGuard)
  // @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  // async get() {
  //   try {
     
  //     const response = await this._airdropService.findAll();

  //     return new ResponseDto(true, response, null);
  //   } catch (error) {
  //     throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Get('without-project')
  // @HttpCode(200)
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, FuncoesGuard)
  // @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  // async findAgreementsWithOutProject() {
  //   try {
  //     const response = await this._airdropService.findAgreementsWithOutProject();

  //     return new ResponseDto(true, response, null);
  //   } catch (error) {
  //     throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST);
  //   }
  // }

  @Get()
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  @ApiQuery({ name: 'withoutProject', required: false, type: Boolean })
  async get(@Query('withoutProject') withoutProject?: string) {
    return this.handleRequest(() =>
      withoutProject === 'true'
        ? this._airdropService.findAgreementsWithOutProject()
        : this._airdropService.findAll()
    );
  }

  @Get('for-association')
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async getForAssociation(@GetUser() user: JwtPayload) {
    return this.handleRequest(() => this._airdropService.findForAssociation(user.userId));
  }

  @Get('agreement-with-project')
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async getAgreementsWithProjects() {
    return this.handleRequest(() => this._airdropService.getAgreementsWithProjects());
  }

  @Post("register")
  @HttpCode(201)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async register(@GetUser() user: JwtPayload, @Body() dto: AgreementRegisterRequestDto) {
    dto.manager = user.userId;
    return this.handleRequest(() => this._airdropService.register(dto));
  }

  @Get(":id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async findById(@Param("id") id: string) {
    return this.handleRequest(() => this._airdropService.findById(id));
  }

  @Post("by-user-id/:id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async findAgreementByUserId(@Param("id") id: string, @Body() userRoles: UserTypeRequestDto) {
    return this.handleRequest(() => this._airdropService.findAgreementByUserId(id, userRoles.roles));
  }

  @Delete(":id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async deleteById(@Param("id") id: string) {
    return this.handleRequest(() => this._airdropService.deleteById(id));
  }

  @Put("update/:id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async update(@Param("id") id: string, @Body() dto: AgreementRegisterRequestDto) {
    return this.handleRequest(() => this._airdropService.update(id, dto));
  }

  @Put("work-plan/:id/:action")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async handleWorkPlan(
    @Param("id") id: string,
    @Param("action") action: "add" | "remove",
    @Body() dto: WorkPlanWorkPlanRequestDto
  ) {
    return this.handleRequest(() => {
      if (action === "add") {
        return this._airdropService.addWorkPlan(id, dto.workPlanId);
      } else if (action === "remove") {
        return this._airdropService.removeWorkPlan(id, dto.workPlanId);
      }
      throw new BadRequestException("Ação inválida");
    });
  }

  // @Put("add-work-plan/:id")
  // @HttpCode(200)
  // @UseGuards(JwtAuthGuard, FuncoesGuard)
  // @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  // @ApiBearerAuth()
  // async addWorkPlan(@Param("id") id: string, @Body() dto: WorkPlanWorkPlanRequestDto) {
  //   try {
  //     const response = await this._airdropService.addWorkPlan(id, dto.workPlanId);
  //     return new ResponseDto(true, response, null);
  //   } catch (error) {
  //     this._logger.error(error.message);

  //     throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST);
  //   }
  // }

  // @Put("remove-work-plan/:id")
  // @HttpCode(200)
  // @UseGuards(JwtAuthGuard, FuncoesGuard)
  // @Funcoes(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  // @ApiBearerAuth()
  // async removeWorkPlan(@Param("id") id: string, @Body() dto: WorkPlanWorkPlanRequestDto) {
  //   try {
  //     const response = await this._airdropService.removeWorkPlan(id, dto.workPlanId);
  //     return response;
  //   } catch (error) {
  //     this._logger.error(error.message);

  //     throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST);
  //   }
  // }
  
}