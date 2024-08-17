import { Model } from "mongoose";
import { SupplierModel } from "../models/supplier.model";
import { SupplierRegisterDto } from "../dtos/supplier-register-request.dto";
import { SupplierUpdateStatusDto } from "../dtos/supplier-update-status-request.dto";
import { SupplierGroupIdUpdateDto } from "../dtos/supplier-group-id-update.dto";
import { NotificationInterface } from "../interfaces/notification.interface";
import { SupplierRegisterBlockRequestDto } from "../dtos/supplier-register-block-request.dt";
export declare class SupplierRepository {
    private readonly _model;
    constructor(_model: Model<SupplierModel>);
    register(dto: SupplierRegisterDto): Promise<SupplierModel>;
    list(): Promise<SupplierModel[]>;
    listById(_id: string): Promise<SupplierModel>;
    updateNotifications(_id: string, dto: NotificationInterface): Promise<SupplierModel>;
    findByIdAndUpdate(_id: string, dto: SupplierRegisterDto): Promise<SupplierModel>;
    findByIdAndUpdateStatus(_id: string, dto: SupplierUpdateStatusDto): Promise<SupplierModel>;
    findByIdAndAddGroup(_id: string, dto: SupplierGroupIdUpdateDto): Promise<SupplierModel>;
    findByIdAndRemoveGroup(_id: string, dto: SupplierGroupIdUpdateDto): Promise<SupplierModel>;
    deleteById(_id: string): Promise<SupplierModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    block(supplierId: string, dto: SupplierRegisterBlockRequestDto): Promise<SupplierModel>;
    unblock(supplierId: string, dto: SupplierRegisterBlockRequestDto): Promise<SupplierModel>;
}
