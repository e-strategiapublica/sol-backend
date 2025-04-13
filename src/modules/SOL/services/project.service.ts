import { Injectable, HttpStatus } from "@nestjs/common";
import {
  ProjectInterface,
  ProjectInterfaceWithId,
} from "../interfaces/project.interface";
import { ProjectRepository } from "../repositories/project.repository";
import { ProjectRegisterRequestDto } from "../dtos/project-register-request.dto";
import { UserRepository } from "../repositories/user.repository";
import { AgreementRepository } from "../repositories/agreement.repository";
import { AgreementActiveStatusEnum } from "../enums/agreement-active-status";
import { ProjectModel } from "../models/database/project.model";
import { ErrorManager } from "../../../shared/utils/error.manager";
import { CustomHttpException } from "src/shared/exceptions/custom-http.exception";
import { UserTypeEnum } from "../enums/user-type.enum";
import { ProjectModel as ProjectModelResponse } from "../models/project.model";

@Injectable()
export class ProjectService {
  constructor(
    private readonly _projectRepository: ProjectRepository,
    private readonly _userRepository: UserRepository,
    private readonly _agreementRepository: AgreementRepository,
    private readonly _projectModel: ProjectModel,
  ) {}
  async findById(id: string): Promise<ProjectInterface> {
    const project = await this._projectRepository.findById(id);
    if (project.activeStatus === AgreementActiveStatusEnum.inactive)
      throw new Error("Project deleted");
    return project;
  }

  async deleteById(id: string): Promise<ProjectInterface> {
    return await this._projectRepository.deleteById(id);
  }

  async register(
    dto: ProjectRegisterRequestDto,
  ): Promise<ProjectModelResponse> {
    const existProject = await this._projectRepository.findByName(dto.name);
    if (existProject) {
      throw new CustomHttpException(
        "Já existe um projeto com esse nome.",
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this._userRepository.getById(dto.project_manager);
    if (!user || user.type !== UserTypeEnum.project_manager)
      throw new CustomHttpException(
        "Usuário não encontrado ou não é um gerente de projeto",
        HttpStatus.BAD_REQUEST,
      );

    const result = await this._projectRepository.register(dto);
    return result;
  }

  async findAll(): Promise<ProjectInterface[]> {
    const result = await this._projectRepository.findAll();

    return result;
  }

  async findAllProjectsForAssociationId(
    associationId: string,
  ): Promise<ProjectInterface[]> {
    const result = [];
    const user = await this._userRepository.getById(associationId);
    const convenios = await this._agreementRepository.findForAssociation(
      user.association._id.toString(),
    );
    for (let i = 0; i < convenios.length; i++) {
      if (convenios[i].project) {
        result.push(
          await this._projectRepository.findById(
            convenios[i].project?._id.toString(),
          ),
        );
      }
    }
    return result;
  }

  async findAllProjectsByReviewerId(
    reviewerId,
  ): Promise<ProjectInterfaceWithId[]> {
    return await this._projectRepository.findAllProjectsByReviewerId(
      reviewerId,
    );
  }
  async findAllProjectsByViewerId(
    reviewerId,
  ): Promise<ProjectInterfaceWithId[]> {
    return await this._projectRepository.findAllProjectsByViewerId(reviewerId);
  }
  async findAllProjectsByManagerId(
    reviewerId: string,
  ): Promise<ProjectInterfaceWithId[]> {
    return await this._projectRepository.findAllProjectsByManagerId(reviewerId);
  }

  async trueDelete(_id: string): Promise<ProjectInterface> {
    const result = await this._projectRepository.trueDelete(_id);

    return result;
  }
}
