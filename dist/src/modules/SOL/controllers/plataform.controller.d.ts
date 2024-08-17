import { ResponseDto } from "src/shared/dtos/response.dto";
import { BidDateUpdateDto } from "../dtos/bid-date-update.dto";
import { PlataformService } from "../services/plataform.service";
export declare class PlataformController {
    private readonly plataformService;
    private readonly logger;
    constructor(plataformService: PlataformService);
    register(dto: BidDateUpdateDto): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    updateById(_id: string, dto: BidDateUpdateDto): Promise<ResponseDto>;
}
