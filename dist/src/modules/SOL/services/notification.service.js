"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_repository_1 = require("../repositories/notification.repository");
const user_repository_1 = require("../repositories/user.repository");
const supplier_repository_1 = require("../repositories/supplier.repository");
const bid_repository_1 = require("../repositories/bid.repository");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(_notificationRepository, _userRepository, _supplierRepository, _bidRepository) {
        this._notificationRepository = _notificationRepository;
        this._userRepository = _userRepository;
        this._supplierRepository = _supplierRepository;
        this._bidRepository = _bidRepository;
        this._logger = new common_1.Logger(NotificationService_1.name);
    }
    async register(dto) {
        const result = await this._notificationRepository.register(dto);
        if (!result)
            throw new common_1.BadRequestException('Não foi possivel cadastrar essa notificação!');
        return result;
    }
    async registerByBidCreation(_id, dto) {
        const user = await this._userRepository.getUserBySupplierId(_id);
        for (let i = 0; i < user.length; i++) {
            const result = await this._notificationRepository.register(dto);
            if (!result)
                throw new common_1.BadRequestException('Não foi possivel cadastrar essa notificação!');
            await this._userRepository.updateNotifications(user[i]._id, result);
        }
        return user;
    }
    async registerforAssociationCreation(_id, dto) {
        const user = await this._userRepository.getById(_id);
        if (!user) {
            throw new common_1.BadRequestException('Usuário não encontrado, não foi possivel cadastrar essa notificação!');
        }
        const result = await this._notificationRepository.register(dto);
        if (!result)
            throw new common_1.BadRequestException('Não foi possivel cadastrar essa notificação!');
        await this._userRepository.updateNotifications(_id, result);
        return user;
    }
    async list() {
        const result = await this._notificationRepository.listNonDeleted();
        return result;
    }
    async updateTittle(_id, dto) {
        const notification = await this._notificationRepository.getById(_id);
        if (!notification || notification.deleted === true) {
            throw new common_1.BadRequestException('Notificação não encontrada!');
        }
        const result = await this._notificationRepository.updateTitleDescription(_id, dto);
        return result;
    }
    async getById(_id) {
        const result = await this._notificationRepository.getById(_id);
        if (result.deleted === true || !result) {
            throw new common_1.BadRequestException('Esse contrato já foi deletado!');
        }
        return result;
    }
    async deleteById(_id) {
        return await this._notificationRepository.deleteById(_id);
    }
    async registerForRealese(reviewId, associationUserId, id) {
        const reviewer = await this._userRepository.getById(reviewId);
        const associationUser = await this._userRepository.getById(associationUserId);
        const bid = await this._bidRepository.getById(id);
        const name = bid.bid_count + '/' + new Date(bid.createdAt).getFullYear();
        if (!reviewer || !associationUser) {
            throw new common_1.BadRequestException('Usuário não encontrado, não foi possivel cadastrar essa notificação!');
        }
        const dtoReviewer = {
            title: 'Licitação aguardando liberação',
            description: `“A Licitação ${name} está aguardando liberação`,
            from_user: associationUser._id,
            deleted: false,
        };
        const dtoAssociation = {
            title: 'Licitação aguardando liberação',
            description: `A Licitação ${name} está aguardando liberação`,
            from_user: reviewer._id,
            deleted: false,
        };
        const resultReviewer = await this._notificationRepository.register(dtoReviewer);
        const resultAssociation = await this._notificationRepository.register(dtoAssociation);
        if (!resultAssociation || !resultReviewer)
            throw new common_1.BadRequestException('Não foi possivel cadastrar essa notificação!');
        await this._userRepository.updateNotifications(reviewer._id, resultReviewer);
        await this._userRepository.updateNotifications(associationUser._id, resultAssociation);
    }
};
NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_repository_1.NotificationRepository,
        user_repository_1.UserRepository,
        supplier_repository_1.SupplierRepository,
        bid_repository_1.BidRepository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map