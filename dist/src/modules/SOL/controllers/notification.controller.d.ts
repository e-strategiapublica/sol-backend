import { ResponseDto } from "src/shared/dtos/response.dto";
import { NotificationService } from "../services/notification.service";
import { NotificationRegisterDto } from "../dtos/notification-register-request.dto";
import { NotificationTitleUpdateDto } from "../dtos/notification-title-update-request.dto";
export declare class NotificationtController {
    private readonly notificationService;
    private readonly logger;
    constructor(notificationService: NotificationService);
    register(dto: NotificationRegisterDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    updateTittleDescription(_id: string, dto: NotificationTitleUpdateDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
}
