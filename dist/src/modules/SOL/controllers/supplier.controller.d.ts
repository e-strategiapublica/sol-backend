import { ResponseDto } from "src/shared/dtos/response.dto";
import { SupplierService } from "../services/supplier.service";
import { SupplierRegisterDto } from "../dtos/supplier-register-request.dto";
import { SupplierUpdateStatusDto } from "../dtos/supplier-update-status-request.dto";
import { SupplierGroupIdUpdateDto } from "../dtos/supplier-group-id-update.dto";
import { SupplierRegisterBlockRequestDto } from "../dtos/supplier-register-block-request.dt";
import { UserService } from "../services/user.service";
export declare class SupplierController {
    private readonly supplierService;
    private readonly userService;
    private readonly logger;
    constructor(supplierService: SupplierService, userService: UserService);
    register(dto: SupplierRegisterDto): Promise<ResponseDto>;
    registerWithoutAuth(dto: SupplierRegisterDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    listWithoutAuth(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    updateById(_id: string, dto: SupplierRegisterDto): Promise<ResponseDto>;
    updateStatusById(_id: string, dto: SupplierUpdateStatusDto): Promise<ResponseDto>;
    updateGroupById(_id: string, dto: SupplierGroupIdUpdateDto): Promise<ResponseDto>;
    block(_id: string, dto: SupplierRegisterBlockRequestDto): Promise<ResponseDto>;
    unblock(_id: string, dto: SupplierRegisterBlockRequestDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
