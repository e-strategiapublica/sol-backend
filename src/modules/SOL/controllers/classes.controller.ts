import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { ClassesService } from "../services/classes.service";
import { ClassesModel } from "../models/database/classes.model";
import { ErrorManager } from "../../../shared/utils/error.manager";

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
      
    constructor(
        private readonly classesService: ClassesService,
        private readonly classesModel: ClassesModel
    ) { }

    private async handleRequest(fn: Function, ...params: any) {
        try {
            return await fn(...params);
        } catch (error) {
            throw ErrorManager.createError(error);
        }
    }

    @Get()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async list() {
        const classes = await this.handleRequest(this.classesModel.list);
        return { data: classes };
    }

    @Post()
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async register(@Body() dto) {
        await this.handleRequest(this.classesModel.verifyCodeExists, dto.code);
        await this.handleRequest(this.classesModel.saveClass, dto);
        return { message: "Created" };
    }

    @Put(':id')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async update(@Param("id") id: string, @Body() dto: any) {
        await this.handleRequest(this.classesModel.updateClass, id, dto);
        return { message: "Updated" };
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deleteById(@Param('id') id: string) {
        await this.handleRequest(this.classesModel.deleteById, id);
        return;  // HTTP 204 No Content, no need to return anything
    }
}
