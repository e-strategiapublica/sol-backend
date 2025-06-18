import { Injectable } from "@nestjs/common";
import { WorkPlan } from "../schemas/work-plan.schema";
import { WorkPlanModel } from "../models/work-plan.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WorkPlanInterface } from "../interfaces/agreement.interface";
import { getValidObjectId } from "../utils/strings.utl";

@Injectable()
export class WorkPlanRepository {
  private url: string = process.env.NOSQL_CONNECTION_STRING;
  private dbName: string = process.env.DATABASE;
  private collection: string = "workplan";

  constructor(
    @InjectModel(WorkPlan.name) private readonly _model: Model<WorkPlanModel>,
  ) {}

  async findById(id: string): Promise<WorkPlanModel> {
    return await this._model.findOne({ _id: getValidObjectId(id) }).populate({
      path: "product",
      populate: {
        path: "items",
        model: "Items",
      },
    });
  }

  async deleteById(id: string): Promise<WorkPlanModel> {
    return await this._model.findByIdAndDelete({
      _id: getValidObjectId(id),
    });
  }

  async register(dto: any): Promise<any> {
    /*
    const client = new MongoClient(this.url);
    const db = client.db(this.dbName);

    const collection = db.collection(this.collection);
    
    const date = new Date()
    dto.createdAt = date;
    dto.updatedAt = date;

    const res = await collection.insertOne(dto);
    await client.close();

    return "1"
    */
    const data = new this._model(dto);
    return await data.save();
  }

  async findAll(): Promise<WorkPlanModel[]> {
    return await this._model.find().populate("product.items");
  }

  async update(id: string, dto: WorkPlanInterface): Promise<WorkPlanModel> {
    return await this._model.findByIdAndUpdate(
      { _id: getValidObjectId(id) },
      { $set: { ...dto } },
      { new: true },
    );
  }

  async listByIds(ids: string[]): Promise<WorkPlanModel[]> {
    return await this._model
      .find({ _id: { $in: ids } })
      .populate("product.items");
  }
}
