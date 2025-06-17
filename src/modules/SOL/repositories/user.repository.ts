import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { UserRegisterRequestDto } from "../dtos/user-register-request.dto";
import { UserUpdatePasswordRequestDto } from "../dtos/user-update-password-request.dto";
import { UserStatusEnum } from "../enums/user-status.enum";
import { UserModel } from "../models/user.model";
import { UserUpdateRequestDto } from "../dtos/user-update-request.dto";
import { UserRegisterPasswordRequestDto } from "../dtos/user-register-password-request.dto";
import { UserTypeEnum } from "../enums/user-type.enum";
import { UserUpdateByIdRequestDto } from "../dtos/user-update-by-id-request.dto";
import { NotificationInterface } from "../interfaces/notification.interface";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { MongoClient, ObjectId } from "mongodb";

@Injectable()
export class UserRepository {
  private url: string = process.env.NOSQL_CONNECTION_STRING;
  private dbName: string = process.env.DATABASE;
  private collection: string = "user";

  constructor(
    @InjectModel(User.name) private readonly _model: Model<UserModel>,
  ) {}

  async getByEmail(email: string): Promise<UserModel> {
    return this._model.findOne({ email: { $eq: email } });
  }

  async getByPhone(phone: string): Promise<UserModel> {
    return await this._model.findOne({ phone });
  }

  async getByDocument(document: string): Promise<UserModel> {
    return await this._model.findOne({ document });
  }

  async getAll(): Promise<UserModel[]> {
    return await this._model.find();
  }

  private getValidObjectId(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid ID");
    }
    return _id;
  }

  async getById(_id: string): Promise<UserModel> {
    return await this._model
      .findById({ _id: this.getValidObjectId(_id) })
      .populate("association")
      .populate("supplier");
  }

  async getByIdPopulate(_id: string): Promise<UserModel> {
    return await this._model
      .findById({ _id: this.getValidObjectId(_id) })
      .populate("association")
      .populate("supplier");
  }

  async getUserBySupplierId(_id: string): Promise<UserModel[]> {
    return await this._model
      .find({ supplier: this.getValidObjectId(_id) })
      .populate("association");
  }

  async listByType(type: UserTypeEnum): Promise<UserModel[]> {
    return await this._model.find({ type }).populate("association");
  }
  async listByRole(role: string): Promise<UserModel[]> {
    return await this._model.find({ roles: role });
  }
  async register(dto: UserRegisterRequestDto): Promise<UserModel> {
    const existUser = await this._model.findOne({ email: { $eq: dto.email } });
    if (existUser) return existUser;
    const newUser = new this._model(dto);
    return newUser.save();
  }

  async updatePassword(_id: string, password: string): Promise<UserModel> {
    return this._model.findOneAndUpdate(
      { _id: this.getValidObjectId(_id) },
      { password },
    );
  }

  async updateNotifications(
    _id: string,
    dto: NotificationInterface,
  ): Promise<UserModel> {
    return await this._model.findOneAndUpdate(
      { _id: this.getValidObjectId(_id) },
      {
        $push: {
          notification_list: dto,
        },
      },
    );
  }

  async update(_id: string, dto: UserUpdateRequestDto): Promise<UserModel> {
    return await this._model.findOneAndUpdate(
      { _id: this.getValidObjectId(_id) },
      {
        $set: {
          name: dto.name,
        },
      },
    );
  }

  async updateById(
    _id: string,
    dto: UserUpdateByIdRequestDto,
  ): Promise<UserModel> {
    return await this._model.findOneAndUpdate(
      { _id: this.getValidObjectId(_id) },
      {
        $set: {
          email: dto.email,
          name: dto.name,
          phone: dto.phone,
          type: dto.type,
          document: dto.document,
          office: dto.office,
          association: dto.association,
          supplier: dto.supplier,
          roles: dto.roles,
        },
      },
    );
  }

  async updateRefreshToken(
    _id: string,
    refreshToken: string | null,
  ): Promise<UserModel> {
    return await this._model.findOneAndUpdate(
      { _id: this.getValidObjectId(_id) },
      {
        $set: {
          refreshToken,
        },
      },
    );
  }

  async registerPassword(
    _id: string,
    dto: UserRegisterPasswordRequestDto,
  ): Promise<UserModel> {
    return await this._model.findOneAndUpdate(
      { _id: this.getValidObjectId(_id) },
      {
        $set: {
          password: dto.password,
          status: dto.status,
        },
      },
    );
  }

  async updateStatus(_id: string, status: UserStatusEnum): Promise<UserModel> {
    return await this._model.findOneAndUpdate(
      { _id: this.getValidObjectId(_id) },
      {
        $set: {
          status,
        },
      },
    );
  }

  async addDeviceToken(token: string, id: string) {
    await this._model.findByIdAndUpdate(id, {
      $push: {
        pushNotificationToken: token,
      },
    });
  }

  async removeDeviceToken(token: string, id: string) {
    await this._model.findByIdAndUpdate(id, {
      $pull: {
        pushNotificationToken: token,
      },
    });
  }

  // async updateProfilePicture(
  //   _id: string,
  //   profilePicture: string,
  // ): Promise<UserModel> {
  //   return await this._model.findOneAndUpdate(
  //     {_id: this.getValidObjectId(_id)},
  //     {
  //       $set: {
  //         profilePicture,
  //       },
  //     },
  //   );
  // }

  async deleteById(_id: string) {
    return await this._model.findOneAndDelete({
      _id: this.getValidObjectId(_id),
    });
  }
}
