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
  private readonly _logger = new Logger(AgreementController.name);

  constructor(private _agreementService: AgreementService) { }

  private async handleRequest<T>(fn: () => Promise<T>): Promise<ResponseDto> {
    try {
      const response = await fn();
      return new ResponseDto(true, response, null);
    } catch (error) {
      this._logger.error(error.message);
      throw new HttpException(new ResponseDto(false, null, [error.message]), HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  @ApiQuery({ name: 'withoutProject', required: false, type: Boolean })
  async get(@Query('withoutProject') withoutProject?: string) {
    return this.handleRequest(() =>
      withoutProject === 'true'
        ? this._agreementService.findAgreementsWithOutProject()
        : this._agreementService.findAll()
    );
  }

  @Get('for-association')
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async getForAssociation(@GetUser() user: JwtPayload) {
    return this.handleRequest(() => this._agreementService.findForAssociation(user.userId));
  }

  @Get('agreement-with-project')
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async getAgreementsWithProjects() {
    return this.handleRequest(() => this._agreementService.getAgreementsWithProjects());
  }

  @Post("register")
  @HttpCode(201)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async register(@GetUser() user: JwtPayload, @Body() dto: AgreementRegisterRequestDto) {
    dto.manager = user.userId;
    return this.handleRequest(() => this._agreementService.register(dto));
  }

  @Get(":id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async findById(@Param("id") id: string) {
    return this.handleRequest(() => this._agreementService.findById(id));
  }

  @Post("by-user-id/:id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async findAgreementByUserId(@Param("id") id: string, @Body() userRoles: UserTypeRequestDto) {
    return this.handleRequest(() => this._agreementService.findAgreementByUserId(id, userRoles.roles));
  }

  @Delete(":id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async deleteById(@Param("id") id: string) {
    return this.handleRequest(() => this._agreementService.deleteById(id));
  }

  @Put("update/:id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async update(@Param("id") id: string, @Body() dto: AgreementRegisterRequestDto) {
    return this.handleRequest(() => this._agreementService.update(id, dto));
  }

  @Put("add-work-plan/:id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async addWorkPlan(@Param("id") id: string, @Body() dto: WorkPlanWorkPlanRequestDto) {
    return this.handleRequest(() => this._agreementService.addWorkPlan(id, dto.workPlanId));
  }

  @Put("remove-work-plan/:id")
  @HttpCode(200)
  @AuthRoles(UserTypeEnum.administrador, UserTypeEnum.associacao, UserTypeEnum.project_manager)
  async removeWorkPlan(@Param("id") id: string, @Body() dto: WorkPlanWorkPlanRequestDto) {
    return this.handleRequest(() => this._agreementService.removeWorkPlan(id, dto.workPlanId));
  }
}