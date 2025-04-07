import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  BadRequestException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  NotFoundException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { CategoryService } from "../services/category.service";
import { CategoryRegisterDto } from "../dtos/category-register-request.dto";
import { ErrorManager } from "../../../shared/utils/error.manager";

@ApiTags("category")
@Controller("category")
export class CategoryController {
  private readonly logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Post("register")
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async register(@Req() request, @Body() dto: CategoryRegisterDto) {
    try {
      const res = await this.categoryService.register(dto);

      if (res["type"] && res["type"] == "error") {
        throw new ErrorManager(HttpStatus.BAD_REQUEST, "Invalid Code", 1);
      }

      return new ResponseDto(true, res, null);
    } catch (error) {
      throw ErrorManager.createError(error);
    }
  }

  @Get("list")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async list() {
    try {
      const response = await this.categoryService.list();

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("listwithAuth")
  @HttpCode(200)
  async listWithAuth() {
    try {
      const response = await this.categoryService.list();

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get("get-by-id/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getById(@Param("_id") _id: string) {
    try {
      const response = await this.categoryService.getById(_id);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put("update/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateById(
    @Param("_id") _id: string,
    @Body() dto: CategoryRegisterDto,
  ) {
    try {
      const response = await this.categoryService.update(_id, dto);

      return new ResponseDto(true, response, null);
    } catch (error) {
      this.logger.error(error.message);

      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete("delete-by-id/:_id")
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteById(@Param("_id") _id: string) {
    try {
      const result = await this.categoryService.deleteById(_id);

      return new ResponseDto(true, result, null);
    } catch (error) {
      throw new HttpException(
        new ResponseDto(false, null, [error.message]),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
