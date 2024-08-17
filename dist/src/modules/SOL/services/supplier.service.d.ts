import { SupplierRepository } from "../repositories/supplier.repository";
import { SupplierModel } from "../models/supplier.model";
import { SupplierRegisterDto } from "../dtos/supplier-register-request.dto";
import { SupplierUpdateStatusDto } from "../dtos/supplier-update-status-request.dto";
import { SupplierGroupIdUpdateDto } from "../dtos/supplier-group-id-update.dto";
import { CategoryRepository } from "../repositories/category.repository";
import { SupplierRegisterBlockRequestDto } from "../dtos/supplier-register-block-request.dt";
export declare class SupplierService {
    private readonly _supplierRepository;
    private readonly _categoryRepository;
    private readonly _logger;
    constructor(_supplierRepository: SupplierRepository, _categoryRepository: CategoryRepository);
    register(dto: SupplierRegisterDto): Promise<SupplierModel>;
    list(): Promise<SupplierModel[]>;
    listById(_id: string): Promise<SupplierModel>;
    update(_id: string, dto: SupplierRegisterDto): Promise<SupplierModel>;
    updateStatus(_id: string, dto: SupplierUpdateStatusDto): Promise<SupplierModel>;
    updateGroup(_id: string, dto: SupplierGroupIdUpdateDto): Promise<SupplierModel>;
    deleteById(_id: string): Promise<SupplierModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    block(supplierId: string, dto: SupplierRegisterBlockRequestDto): Promise<SupplierModel>;
    unblock(supplierId: string, dto: SupplierRegisterBlockRequestDto): Promise<SupplierModel>;
}
