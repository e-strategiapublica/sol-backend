import { Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Allotment } from "../schemas/allotment.schema";
import { AllotmentModel } from "../models/allotment.model";
import { AllotmentRegisterDto } from "../dtos/allotment-register-request.dto";
import { ItemRequestDto } from "../dtos/item-register-request.dto";
import { ProposalInAllotmentRequestDto } from "../dtos/proposal-in-allotment-request.dto";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";

@Injectable()
export class AllotmentRepository {
  constructor(
    @InjectModel(Allotment.name) private readonly _model: Model<AllotmentModel>,
  ) {}

  async register(dto: AllotmentRegisterDto): Promise<AllotmentModel> {
    const data = await new this._model(dto);

    return data.save();
  }

  async list(): Promise<AllotmentModel[]> {
    const list = await this._model.find();

    return list;
  }

  async listById(_id: string): Promise<AllotmentModel> {
    const list = await this._model.findOne({ _id });
    return list;
  }

  async listByIds(_ids: string[]): Promise<AllotmentModel[]> {
    const list = await this._model.find({ _id: { $in: _ids } });

    return list;
  }

  async update(_id, dto: AllotmentRegisterDto): Promise<AllotmentModel> {
    return await this._model.findOneAndUpdate(
      { _id },
      {
        $set: { dto },
      },
      { new: true },
    );
  }

  async editUpdate(_id, dto: AllotmentRegisterDto): Promise<AllotmentModel> {
    return await this._model.findOneAndUpdate(
      { _id },
      {
        $set: { allotment_name: dto.allotment_name },
      },
      { new: true },
    );
  }

  async updateStauts(
    _id,
    status: AllotmentStatusEnum,
  ): Promise<AllotmentModel> {
    return await this._model.findOneAndUpdate(
      { _id },
      {
        $set: { status },
      },
    );
  }

  async addProposal(
    _id,
    dto: ProposalInAllotmentRequestDto[],
  ): Promise<AllotmentModel> {
    return await this._model.findOneAndUpdate(
      { _id },
      {
        $set: { proposals: dto },
      },
      { new: true },
    );
  }

  async updateProposal(_id: string, dto: any): Promise<AllotmentModel> {
    const item = await this._model.findOneAndUpdate(
      { _id },
      {
        $push: {
          proposals: dto,
        },
      },
      { new: true },
    );
    return item;
  }

  async updateItem(_id: string, dto: ItemRequestDto): Promise<AllotmentModel> {
    const item = await this._model.findOneAndUpdate(
      { _id },
      {
        $push: {
          add_item: dto,
        },
      },
      { new: true },
    );
    return item;
  }

  async removeProposal(_id: string): Promise<AllotmentModel> {
    return await this._model.findOneAndUpdate(
      { _id, proposals: { $exists: true } },
      {
        $set: { proposals: [] },
      },
      { new: true },
    );
  }

  async updateStatusByIds(
    _ids: string[],
    status: AllotmentStatusEnum,
  ): Promise<any> {
    return await this._model.updateMany(
      { _id: { $in: _ids } },
      { $set: { status } },
    );
  }
}
