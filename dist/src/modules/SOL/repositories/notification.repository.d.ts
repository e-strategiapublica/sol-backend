import { Model } from "mongoose";
import { NotificationModel } from "../models/notification.model";
import { NotificationRegisterDto } from "../dtos/notification-register-request.dto";
import { NotificationUpdateDto } from "../dtos/notification-update-request.dto";
import { NotificationTitleUpdateDto } from "../dtos/notification-title-update-request.dto";
export declare class NotificationRepository {
    private readonly _model;
    constructor(_model: Model<NotificationModel>);
    register(dto: NotificationRegisterDto): Promise<NotificationModel>;
    addUser(_id: string, dto: NotificationUpdateDto): Promise<NotificationModel>;
    remove(_id: string, dto: NotificationUpdateDto): Promise<NotificationModel>;
    updateTitleDescription(_id: string, dto: NotificationTitleUpdateDto): Promise<NotificationModel>;
    list(): Promise<NotificationModel[]>;
    listNonDeleted(): Promise<NotificationModel[]>;
    getById(_id: string): Promise<NotificationModel>;
    deleteById(_id: string): Promise<NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
