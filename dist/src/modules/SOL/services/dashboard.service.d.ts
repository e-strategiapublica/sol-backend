import { BidRepository } from "../repositories/bid.repository";
import { SupplierRepository } from "../repositories/supplier.repository";
import { AssociationRepository } from "../repositories/association.repository";
import { DashboardResponseDto } from "../dtos/dashboard-response.dto";
export declare class DashboardService {
    private _bidRepository;
    private _supplierRepository;
    private _associationRepository;
    private readonly _logger;
    constructor(_bidRepository: BidRepository, _supplierRepository: SupplierRepository, _associationRepository: AssociationRepository);
    getData(): Promise<DashboardResponseDto>;
}
