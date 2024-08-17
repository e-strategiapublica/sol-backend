import { ResponseDto } from "src/shared/dtos/response.dto";
import { ProductService } from "../services/product.service";
import { ProductRegisterDto } from "../dtos/product-register-request.dto";
export declare class ProductController {
    private readonly productSerivce;
    private readonly logger;
    constructor(productSerivce: ProductService);
    register(request: any, dto: ProductRegisterDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    updateById(_id: string, dto: ProductRegisterDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
