import { Model } from "mongoose";
import { ProjectModel } from "../models/project.model";
import { ProjectRegisterRequestDto } from "../dtos/project-register-request.dto";
import { ProjectInterfaceWithId } from "../interfaces/project.interface";
export declare class ProjectRepository {
    private readonly _model;
    constructor(_model: Model<ProjectModel>);
    findById(id: string): Promise<ProjectModel>;
    findByEmail(email: string): Promise<ProjectModel>;
    deleteById(id: string): Promise<ProjectModel>;
    trueDelete(id: string): Promise<ProjectModel>;
    register(dto: ProjectRegisterRequestDto): Promise<ProjectModel>;
    findAllProjectsByReviewerId(reviewerId: string): Promise<ProjectInterfaceWithId[]>;
    findAllProjectsByViewerId(reviewerId: string): Promise<ProjectInterfaceWithId[]>;
    findAllProjectsByManagerId(reviewerId: string): Promise<ProjectInterfaceWithId[]>;
    findAll(): Promise<ProjectModel[]>;
}
