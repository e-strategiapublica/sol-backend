import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AgreementRegisterRequestDto } from "../dtos/agreement-register-request.dto";
import { AgreementModel } from "../models/agreement.model";
import { Agreement } from "../schemas/agreement.schema";
import { AgreementActiveStatusEnum } from "../enums/agreement-active-status";
import { AssociationModel } from "../models/association.model";
import { ProjectModel } from "../models/project.model";
@Injectable()
export class AgreementRepository {
  constructor(
    @InjectModel(Agreement.name) private readonly _model: Model<AgreementModel>,
  ) {}

  async findById(id: string): Promise<AgreementModel> {
    return await this._model
      .findOne({ _id: id })
      .populate("workPlan")
      .populate("association")
      .populate("manager")
      .populate("project")
      .populate("reviewer");
  }

  async findAgreementByReviewerOrManagerId(
    _id: string,
  ): Promise<AgreementModel[]> {
    return await this._model.find({
      $or: [{ manager: _id }, { reviewer: _id }],
    });
  }

  async findAgreementByReviewerId(_id: string): Promise<AgreementModel[]> {
    return await this._model.find({
      reviewer: _id,
    });
  }

  async findAgreementByManagerId(_id: string): Promise<AgreementModel[]> {
    return await this._model
      .find({
        manager: _id,
      })
      .populate("workPlan");
  }

  async findAgreementByProjectId(_id: string): Promise<AgreementModel> {
    return await this._model
      .findOne({
        project: _id,
      })
      .populate("workPlan");
  }

  async deleteById(id: string): Promise<AgreementModel> {
    return await this._model.findOneAndUpdate(
      { _id: id },
      { $set: { activeStatus: AgreementActiveStatusEnum.inactive } },
    );
  }

  async register(
    dto: AgreementRegisterRequestDto & {
      association: AssociationModel;
      project: ProjectModel;
    },
  ): Promise<AgreementModel> {
    const data = new this._model(dto);
    return await data.save();
  }

  async findAll(): Promise<AgreementModel[]> {
    return await this._model
      .find({ activeStatus: AgreementActiveStatusEnum.active })

      .populate("association")
      .populate("reviewer")
      .populate({
        path: "workPlan",
        populate: {
          path: "product",
          populate: {
            path: "items",
          },
        },
      })
      .populate("manager");
  }

  async findAgreementsWithOutProject(
    array: string[],
  ): Promise<AgreementModel[]> {
    return await this._model.find({ _id: { $nin: array } });
  }

  async findAgreementsWithProject(array: string[]): Promise<AgreementModel[]> {
    return await this._model
      .find({
        _id: { $in: array },
        activeStatus: AgreementActiveStatusEnum.active,
      })
      // .populate("reviewer")
      .populate("association")
      .populate("manager")
      .populate("reviewer")
      .populate({
        path: "workPlan",
        populate: {
          path: "product",
          populate: {
            path: "items",
          },
        },
      });
  }

  async findForAssociation(associationId: string): Promise<AgreementModel[]> {
    return await this._model
      .find({
        association: { _id: associationId },
        activeStatus: AgreementActiveStatusEnum.active,
      })
      // .populate("reviewer")
      .populate("association")
      .populate("manager")
      .populate("reviewer")
      .populate({
        path: "workPlan",
        populate: {
          path: "product",
          populate: {
            path: "items",
          },
        },
      });
  }

  async findForGerenteGeralProjetos(
    projectManagerId: string,
  ): Promise<AgreementModel[]> {
    return await this._model
      .find({
        manager: { _id: projectManagerId },
        activeStatus: AgreementActiveStatusEnum.active,
      })
      // .populate("reviewer")
      .populate("association")
      .populate("manager")
      .populate("reviewer")
      .populate({
        path: "workPlan",
        populate: {
          path: "product",
          populate: {
            path: "items",
          },
        },
      });
  }

  async findForReviewer(reviewerId: string): Promise<AgreementModel[]> {
    return await this._model
      .find({
        reviewer: { _id: reviewerId },
        activeStatus: AgreementActiveStatusEnum.active,
      })
      // .populate("reviewer")
      .populate("association")
      .populate("manager")
      .populate("reviewer")
      .populate({
        path: "workPlan",
        populate: {
          path: "product",
          populate: {
            path: "items",
          },
        },
      });
  }
  async findByProjectId(projectId: string): Promise<AgreementModel[]> {
    return await this._model
      .find({ project: { _id: projectId } })
      // .populate("reviewer")
      .populate("association")
      .populate("project")
      .populate("manager")
      .populate("reviewer")
      .populate({
        path: "workPlan",
        populate: {
          path: "product",
          populate: {
            path: "items",
          },
        },
      });
  }

  async addManager(id: string, dto: any): Promise<AgreementModel> {
    return await this._model.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          manager: dto,
        },
      },
      { new: true },
    );
  }

  async update(id: string, dto: any): Promise<AgreementModel> {
    return await this._model.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...dto,
        },
      },
      { new: true },
    );
  }
}
