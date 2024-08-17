import { GroupRepository } from "../repositories/group.repository";
import { GroupModel } from "../models/group.model";
import { GroupRegisterDto } from "../dtos/group-register-request.dto";
import { GroupUpdatenameDto } from "../dtos/group-update-name-request.dto";
import { GroupAddItemsRequestDto } from "../dtos/group-add-items-request.dto";
export declare class GroupService {
    private readonly _groupRepository;
    private readonly _logger;
    constructor(_groupRepository: GroupRepository);
    register(dto: GroupRegisterDto): Promise<GroupModel>;
    list(): Promise<GroupModel[]>;
    updateName(_id: string, dto: GroupUpdatenameDto): Promise<GroupModel>;
    addItem(_id: string, dto: GroupAddItemsRequestDto): Promise<GroupModel>;
    removeItem(_id: string, dto: GroupAddItemsRequestDto): Promise<GroupModel>;
    getById(_id: string): Promise<GroupModel>;
    deleteById(_id: string): Promise<GroupModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
