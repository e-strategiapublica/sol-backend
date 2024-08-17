import { GroupCostItemRelationDto } from "./group-costItem-relation-register-request.dto";
export declare abstract class GroupRegisterDto {
    name: string;
    idAgreements: string;
    items: GroupCostItemRelationDto[];
}
