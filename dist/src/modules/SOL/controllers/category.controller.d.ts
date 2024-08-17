import { ResponseDto } from "src/shared/dtos/response.dto";
import { CategoryService } from "../services/category.service";
import { CategoryRegisterDto } from "../dtos/category-register-request.dto";
export declare class CategoryController {
    private readonly categoryService;
    private readonly logger;
    constructor(categoryService: CategoryService);
    register(request: any, dto: CategoryRegisterDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    listWithAuth(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    updateById(_id: string, dto: CategoryRegisterDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
