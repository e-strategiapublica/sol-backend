import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationRegisterDto } from "../dtos/notification-register-request.dto";
import { NotificationModel } from "../models/notification.model";
import { NotificationTitleUpdateDto } from "../dtos/notification-title-update-request.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserModel } from "../models/user.model";
import { SupplierRepository } from "../repositories/supplier.repository";
import { BidRepository } from "../repositories/bid.repository";
export declare class NotificationService {
    private readonly _notificationRepository;
    private readonly _userRepository;
    private readonly _supplierRepository;
    private readonly _bidRepository;
    private readonly _logger;
    constructor(_notificationRepository: NotificationRepository, _userRepository: UserRepository, _supplierRepository: SupplierRepository, _bidRepository: BidRepository);
    register(dto: NotificationRegisterDto): Promise<NotificationModel>;
    registerByBidCreation(_id: string, dto: NotificationRegisterDto): Promise<UserModel[] | void>;
    registerforAssociationCreation(_id: string, dto: NotificationRegisterDto): Promise<UserModel>;
    list(): Promise<NotificationModel[]>;
    updateTittle(_id: string, dto: NotificationTitleUpdateDto): Promise<NotificationModel>;
    getById(_id: string): Promise<NotificationModel>;
    deleteById(_id: string): Promise<NotificationModel & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    registerForRealese(reviewId: string, associationUserId: string, id: string): Promise<UserModel[] | void>;
}
