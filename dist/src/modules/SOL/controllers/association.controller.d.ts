import { AssociationRegisterRequestDto } from "../dtos/association-register-request.dto";
import { ResponseDto } from "src/shared/dtos/response.dto";
import { AssociationService } from "../services/association.service";
export declare class AssociationController {
    private readonly associationService;
    private readonly logger;
    constructor(associationService: AssociationService);
    register(dto: AssociationRegisterRequestDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    updateById(_id: string, dto: AssociationRegisterRequestDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
