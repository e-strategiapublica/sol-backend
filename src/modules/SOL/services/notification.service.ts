import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification.repository";
import { NotificationRegisterDto } from "../dtos/notification-register-request.dto";
import { NotificationModel } from "../models/notification.model";
import { NotificationUpdateDto } from "../dtos/notification-update-request.dto";
import { NotificationTitleUpdateDto } from "../dtos/notification-title-update-request.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserModel } from "../models/user.model";
import { SupplierRepository } from "../repositories/supplier.repository";
import { SupplierModel } from "../models/supplier.model";
import { BidRepository } from "../repositories/bid.repository";

@Injectable()
export class NotificationService {

    private readonly _logger = new Logger(NotificationService.name);

    constructor(
        private readonly _notificationRepository: NotificationRepository,
        private readonly _userRepository: UserRepository,
        private readonly _supplierRepository: SupplierRepository,
        private readonly _bidRepository: BidRepository
    ) { }

    async register(dto: NotificationRegisterDto): Promise<NotificationModel> {
      

        const result = await this._notificationRepository.register(dto);
        if (!result)
            throw new BadRequestException('Não foi possivel cadastrar essa notificação!');

        return result;

    }

    async registerByBidCreation(_id: string , dto: NotificationRegisterDto): Promise<UserModel[] | void> {
       
        const user: UserModel[] = await this._userRepository.getUserBySupplierId(_id)
     
        for (let i = 0; i < user.length; i ++ ) {
            const result = await this._notificationRepository.register(dto);
            if (!result)
                throw new BadRequestException('Não foi possivel cadastrar essa notificação!');
            
                await this._userRepository.updateNotifications(user[i].id, result)
            
            
        }

        
        return user;

    }

    async registerforAssociationCreation(_id: string , dto: NotificationRegisterDto): Promise<UserModel> {
        const user: UserModel = await this._userRepository.getById(_id)
  
        if (!user) {
          throw new BadRequestException('Usuário não encontrado, não foi possivel cadastrar essa notificação!');
        }
  
          const result = await this._notificationRepository.register(dto);
          if (!result)
              throw new BadRequestException('Não foi possivel cadastrar essa notificação!');
          
          
          await this._userRepository.updateNotifications(_id, result)
      
          return user;
  
      }

   

    async list(): Promise<NotificationModel[]> {
        const result = await this._notificationRepository.listNonDeleted();
        return result;
    }

      async updateTittle(_id: string, dto: NotificationTitleUpdateDto): Promise<NotificationModel> {
        
        const notification =  await this._notificationRepository.getById(_id);
        if (!notification || notification.deleted === true) {
            throw new BadRequestException('Notificação não encontrada!');
        }
        
        const result = await this._notificationRepository.updateTitleDescription(_id, dto);
        return result
  
        
      }


    async getById(_id: string): Promise<NotificationModel> {
        const result = await this._notificationRepository.getById(_id);
        if(result.deleted === true || !result) {
            throw new BadRequestException('Esse contrato já foi deletado!');
        }
        return result;
    }

    async deleteById(_id: string) {
        return await this._notificationRepository.deleteById(_id);
    }


    async registerForRealese(reviewId: string, associationUserId:string, id:string): Promise<UserModel[] | void> {
        const reviewer = await this._userRepository.getById(reviewId)
        const associationUser = await this._userRepository.getById(associationUserId)
        const bid = await this._bidRepository.getById(id)
        const name = bid.bid_count+'/'+new Date(bid.createdAt).getFullYear()
        
        if (!reviewer || !associationUser) {
            throw new BadRequestException('Usuário não encontrado, não foi possivel cadastrar essa notificação!');
        }

        const dtoReviewer: NotificationRegisterDto = {
            title: 'Licitação aguardando liberação',            
            description: `“A Licitação ${name} está aguardando liberação`,            
            from_user: associationUser.id,
            deleted: false,
        }

        const dtoAssociation: NotificationRegisterDto = {
            title: 'Licitação aguardando liberação',
            description: `A Licitação ${name} está aguardando liberação`,
            from_user: reviewer.id,
            deleted: false,
        }

        const resultReviewer = await this._notificationRepository.register(dtoReviewer);
        const resultAssociation = await this._notificationRepository.register(dtoAssociation);
        
        if (!resultAssociation || !resultReviewer)
            throw new BadRequestException('Não foi possivel cadastrar essa notificação!');

        await this._userRepository.updateNotifications(reviewer.id, resultReviewer)
        await this._userRepository.updateNotifications(associationUser.id, resultAssociation)
    }

}
