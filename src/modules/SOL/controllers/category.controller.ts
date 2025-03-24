import { 
    Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Logger, 
    Param, Post, Put, Req, UseGuards 
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { CategoryService } from "../services/category.service";
import { CategoryRegisterDto } from "../dtos/category-register-request.dto";
import { ErrorManager } from "../../../shared/utils/error.manager";

@ApiTags('categories')
@Controller('categories')
export class CategoryController {

    private readonly logger = new Logger(CategoryController.name);
 
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()

    async create(@Req() request, @Body() dto: CategoryRegisterDto) {
        try {
            const category = await this.categoryService.register(dto);
            return new ResponseDto(true, category, null); // ✅ Agora com 3 argumentos
        } catch (error) {
            throw ErrorManager.createError(error);
        }
    }

    @Get()
    @HttpCode(200)
    async list() {
        try {
            const categories = await this.categoryService.list();
            return new ResponseDto(true, categories, null); // ✅ Agora com 3 argumentos
        } catch (error) {
            this.logger.error(error.message);
            throw ErrorManager.createError(error);
        }
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getById(@Param('id') id: string) {
        try {
            const category = await this.categoryService.getById(id);
            return new ResponseDto(true, category, null); // ✅ Agora com 3 argumentos
        } catch (error) {
            this.logger.error(error.message);
            throw ErrorManager.createError(error);
        }
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async update(@Param('id') id: string, @Body() dto: CategoryRegisterDto) {
        try {
            const updatedCategory = await this.categoryService.update(id, dto);
            return new ResponseDto(true, updatedCategory, null); // ✅ Agora com 3 argumentos
        } catch (error) {
            this.logger.error(error.message);
            throw ErrorManager.createError(error);
        }
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async delete(@Param('id') id: string) {
        try {
            await this.categoryService.deleteById(id);
            return new ResponseDto(true, null, null); // ✅ Agora com 3 argumentos
        } catch (error) {
            this.logger.error(error.message);
            throw ErrorManager.createError(error);
        }
    }
}
