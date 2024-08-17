import { ProjectInterface, ProjectInterfaceWithId } from "../interfaces/project.interface";
import { ProjectRepository } from "../repositories/project.repository";
import { ProjectRegisterRequestDto } from "../dtos/project-register-request.dto";
import { UserRepository } from "../repositories/user.repository";
import { AgreementRepository } from "../repositories/agreement.repository";
import { ProjectModel } from "../models/database/project.model";
export declare class ProjectService {
    private readonly _projectRepository;
    private readonly _userRepository;
    private readonly _agreementRepository;
    private readonly _projectModel;
    constructor(_projectRepository: ProjectRepository, _userRepository: UserRepository, _agreementRepository: AgreementRepository, _projectModel: ProjectModel);
    findById(id: string): Promise<ProjectInterface>;
    deleteById(id: string): Promise<ProjectInterface>;
    register(dto: ProjectRegisterRequestDto): Promise<ProjectInterface | any>;
    findAll(): Promise<ProjectInterface[]>;
    findAllProjectsForAssociationId(associationId: string): Promise<ProjectInterface[]>;
    findAllProjectsByReviewerId(reviewerId: any): Promise<ProjectInterfaceWithId[]>;
    findAllProjectsByViewerId(reviewerId: any): Promise<ProjectInterfaceWithId[]>;
    findAllProjectsByManagerId(reviewerId: string): Promise<ProjectInterfaceWithId[]>;
    trueDelete(_id: string): Promise<ProjectInterface>;
}
