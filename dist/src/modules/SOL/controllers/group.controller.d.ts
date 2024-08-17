import { ResponseDto } from "src/shared/dtos/response.dto";
import { GroupService } from "../services/group.service";
import { GroupRegisterDto } from "../dtos/group-register-request.dto";
import { GroupUpdatenameDto } from "../dtos/group-update-name-request.dto";
import { GroupAddItemsRequestDto } from "../dtos/group-add-items-request.dto";
export declare class GroupController {
    private readonly groupService;
    private readonly logger;
    constructor(groupService: GroupService);
    register(dto: GroupRegisterDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    updateNameById(_id: string, dto: GroupUpdatenameDto): Promise<ResponseDto>;
    addItemById(_id: string, dto: GroupAddItemsRequestDto): Promise<ResponseDto>;
    removeItemById(_id: string, dto: GroupAddItemsRequestDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
