import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Products } from "../schemas/product.schema";
import { ProductModel } from "../models/product.model";
import { ProductRegisterDto } from "../dtos/product-register-request.dto";
import { getValidObjectId } from "../utils/strings.utl";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Products.name) private readonly _model: Model<ProductModel>,
  ) {}

  async register(dto: ProductRegisterDto): Promise<any> {
    const data = new this._model(dto);
    return data.save();
  }

  async update(_id: string, dto: ProductRegisterDto): Promise<ProductModel> {
    return await this._model.findOneAndUpdate(
      { _id: getValidObjectId(_id) },
      {
        $set: {
          product_name: dto.product_name,
          pdm: dto.pdm,
        },
      },
      { new: true },
    );
  }

  async list(): Promise<ProductModel[]> {
    return await this._model.find();
  }

  async getById(_id: string): Promise<ProductModel> {
    return await this._model.findOne({ _id: getValidObjectId(_id) });
  }

  async getByIdentifier(identifier: number): Promise<ProductModel> {
    return await this._model.findOne({ identifier });
  }

  async deleteById(_id: string) {
    return await this._model.findByIdAndDelete({ _id: getValidObjectId(_id) });
  }

  async getByName(product_name: string): Promise<ProductModel> {
    return await this._model.findOne({ product_name });
  }
}
