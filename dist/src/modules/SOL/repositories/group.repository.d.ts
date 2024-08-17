import { Model } from "mongoose";
import { GroupModel } from "../models/group.model";
import { GroupRegisterDto } from "../dtos/group-register-request.dto";
import { GroupUpdatenameDto } from "../dtos/group-update-name-request.dto";
import { GroupAddItemsRequestDto } from "../dtos/group-add-items-request.dto";
export declare class GroupRepository {
    private readonly _model;
    constructor(_model: Model<GroupModel>);
    register(dto: GroupRegisterDto): Promise<any>;
    updateName(_id: string, dto: GroupUpdatenameDto): Promise<GroupModel>;
    addItem(_id: string, dto: GroupAddItemsRequestDto): Promise<GroupModel | any>;
    removeItem(_id: string, dto: GroupAddItemsRequestDto): Promise<GroupModel>;
    list(): Promise<GroupModel[]>;
    getById(_id: string): Promise<GroupModel>;
    deleteById(_id: string): Promise<GroupModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
