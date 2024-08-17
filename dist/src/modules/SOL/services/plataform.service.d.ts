import { BidDateUpdateDto } from "../dtos/bid-date-update.dto";
import { PlataformRepository } from "../repositories/plataform.repository";
import { PlataformModel } from "../models/plataform.model";
export declare class PlataformService {
    private readonly _plataformRepository;
    private readonly _logger;
    constructor(_plataformRepository: PlataformRepository);
    register(dto: BidDateUpdateDto): Promise<PlataformModel>;
    findOne(): Promise<PlataformModel>;
    update(_id: string, dto: BidDateUpdateDto): Promise<PlataformModel>;
}
