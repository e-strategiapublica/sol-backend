import { Injectable } from "@nestjs/common";
import { WorkPlanRepository } from "../repositories/work-plan.repository";
import { WorkPlanRegisterRequestDto } from "../dtos/work-plan-register-request.dto";
import { CostItemsService } from "./cost-items.service";
import { ItemsModel } from "../models/database/items.model";
import { WorkPlanModel } from "../models/work-plan.model";
import { ObjectId } from "mongodb";

@Injectable()
export class WorkPlanService {
  constructor(
    private readonly _workPlanRepository: WorkPlanRepository,
    private readonly _costItemsService: CostItemsService,
    private readonly _itemsModel: ItemsModel,
  ) {}

  async findById(id: string): Promise<WorkPlanModel> {
    return await this._workPlanRepository.findById(id);
  }

  async deleteById(id: string): Promise<WorkPlanModel> {
    return await this._workPlanRepository.deleteById(id);
  }

  async register(dto: any): Promise<WorkPlanModel> {
    let itemArray = [];
    for (let i = 0; i < dto.product.length; i++) {
      itemArray.push({ _id: new ObjectId(dto.product[i].items) });
    }
    const costItems = await this._itemsModel.listByIds(itemArray);

    for (let i = 0; i < dto.product.length; i++) {
      const item = costItems.find(
        (item) => item._id.toString() === dto.product[i].items,
      );
      dto.product[i].items = item as any;
    }

    const result = await this._workPlanRepository.register(dto as any);

    return result;
  }

  async registerFromIntegration(
    dto: WorkPlanRegisterRequestDto,
  ): Promise<WorkPlanModel> {
    const costItems = await this._costItemsService.listByIds(
      dto.product.map((item) => item.items),
    );

    for (let i = 0; i < dto.product.length; i++) {
      const item = costItems.find(
        (item) => item._id.toString() === dto.product[i].items,
      );
      dto.product[i].items = item as any;
    }

    const result = await this._workPlanRepository.register(dto as any);

    return result;
  }

  async findAll(): Promise<WorkPlanModel[]> {
    const result = await this._workPlanRepository.findAll();

    return result;
  }

  async listByIds(ids: string[]): Promise<WorkPlanModel[]> {
    const result = await this._workPlanRepository.listByIds(ids);

    return result;
  }

  async update(id: string, dto: any): Promise<WorkPlanModel> {
    return await this._workPlanRepository.update(id, dto);
  }
}
