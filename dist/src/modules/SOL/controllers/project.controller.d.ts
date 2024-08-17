import { ResponseDto } from "src/shared/dtos/response.dto";
import { ProjectService } from "../services/project.service";
import { ProjectRegisterRequestDto } from "../dtos/project-register-request.dto";
export declare class ProjectController {
    private _projectService;
    private readonly _logger;
    constructor(_projectService: ProjectService);
    get(): Promise<ResponseDto>;
    register(request: any, dto: ProjectRegisterRequestDto): Promise<{
        type: string;
    }>;
    findById(id: string): Promise<ResponseDto>;
    findAllProjectsForAssociationId(id: string): Promise<ResponseDto>;
    findAllProjectsByViewerId(id: string): Promise<ResponseDto>;
    findAllProjectsByReviewerId(id: string): Promise<ResponseDto>;
    findAllProjectsByManagerId(id: string): Promise<ResponseDto>;
    deleteById(id: string): Promise<ResponseDto>;
}
