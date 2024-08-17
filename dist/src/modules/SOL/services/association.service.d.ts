import { AssociationRepository } from "../repositories/association.repository";
import { AssociationRegisterRequestDto } from "../dtos/association-register-request.dto";
import { AssociationModel } from "../models/association.model";
import { AssociationUpdateRequestDto } from "../dtos/association-update-request.dto";
import { ResponseEndpointAssociationDto } from "../dtos/response-endpoint-association.dto";
import { UserRepository } from "../repositories/user.repository";
import { MyAssociationModel } from "../models/database/association.model";
export declare class AssociationService {
    private _associationRepository;
    private _userRepository;
    private _associationModel;
    private readonly _logger;
    constructor(_associationRepository: AssociationRepository, _userRepository: UserRepository, _associationModel: MyAssociationModel);
    register(dto: AssociationRegisterRequestDto): Promise<AssociationModel>;
    registerFromIntegration(dto: AssociationRegisterRequestDto): Promise<AssociationModel | {
        type: string;
    }>;
    update(_id: string, dto: AssociationUpdateRequestDto): Promise<AssociationModel>;
    list(): Promise<AssociationModel[]>;
    getById(_id: string): Promise<AssociationModel>;
    deleteById(_id: string): Promise<AssociationModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getByCnpj(cnpj: string): Promise<AssociationModel>;
    handlerJob(data: ResponseEndpointAssociationDto[]): Promise<void>;
}
