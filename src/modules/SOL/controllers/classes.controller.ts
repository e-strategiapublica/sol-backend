import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/shared/guards/jwt-auth.guard";
import { ClassesService } from "../services/classes.service";
import { ClassesModel } from "../models/database/classes.model";
import { ErrorManager } from "../../../shared/utils/error.manager";

// Definição do Swagger para o controlador 'classes'
@ApiTags('classes')
@Controller('classes')
export class ClassesController {

    // Injeção de dependências para o serviço e o modelo de dados 'classes'
    constructor(
        private readonly classesService: ClassesService,
        private readonly classesModel: ClassesModel
    ) { }

    // Função para tratar as requisições de forma centralizada, tratando erros
    private async handleRequest(fn: Function, ...params: any) {
        try {
            return await fn(...params); // Chama a função passando os parâmetros
        } catch (error) {
            // Em caso de erro, cria um erro padronizado utilizando o ErrorManager
            throw ErrorManager.createError(error);
        }
    }

    // Rota para listar todas as classes
    @Get()
    @HttpCode(200) // Retorna o código HTTP 200 em caso de sucesso
    @UseGuards(JwtAuthGuard) // Protege a rota com o guard de autenticação JWT
    @ApiBearerAuth() // Define que a API requer autenticação via Bearer Token
    async list() {
        const classes = await this.handleRequest(this.classesModel.list); // Chama a função para listar as classes
        return { data: classes }; // Retorna as classes no formato esperado
    }

    // Rota para registrar uma nova classe
    @Post()
    @HttpCode(201) // Retorna o código HTTP 201 quando a classe for criada
    @UseGuards(JwtAuthGuard) // Protege a rota com o guard de autenticação JWT
    @ApiBearerAuth() // Define que a API requer autenticação via Bearer Token
    async register(@Body() dto) {
        // Verifica se o código da classe já existe
        await this.handleRequest(this.classesModel.verifyCodeExists, dto.code);
        // Salva a nova classe
        await this.handleRequest(this.classesModel.saveClass, dto);
        return { message: "Created" }; // Retorna uma mensagem de sucesso
    }

    // Rota para atualizar uma classe existente
    @Put(':id')
    @HttpCode(200) // Retorna o código HTTP 200 quando a classe for atualizada
    @UseGuards(JwtAuthGuard) // Protege a rota com o guard de autenticação JWT
    @ApiBearerAuth() // Define que a API requer autenticação via Bearer Token
    async update(@Param("id") id: string, @Body() dto: any) {
        // Atualiza a classe com o id especificado
        await this.handleRequest(this.classesModel.updateClass, id, dto);
        return { message: "Updated" }; // Retorna uma mensagem de sucesso
    }

    // Rota para deletar uma classe pelo ID
    @Delete(':id')
    @HttpCode(204) // Retorna o código HTTP 204 em caso de sucesso (sem conteúdo)
    @UseGuards(JwtAuthGuard) // Protege a rota com o guard de autenticação JWT
    @ApiBearerAuth() // Define que a API requer autenticação via Bearer Token
    async deleteById(@Param('id') id: string) {
        // Deleta a classe com o id especificado
        await this.handleRequest(this.classesModel.deleteById, id);
        return;  // HTTP 204 No Content, não há necessidade de retornar dados
    }
}
