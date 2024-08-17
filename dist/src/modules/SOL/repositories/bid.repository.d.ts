import mongoose, { Model } from "mongoose";
import { BidModel } from "../models/bid.model";
import { BideRegisterDto } from "../dtos/bid-register-request.dto";
import { BidUpdateDto } from "../dtos/bid-update-request.dto";
import { BidUpdateStatusRequestDto } from "../dtos/bid-update-status-request.dto";
import { BidAddProposalDto } from "../dtos/bid-add-proposal.dto";
import { BidChangeStatusRequestDto } from "../dtos/bid-change-status-request.dto";
import { BidStatusEnum } from "../enums/bid-status.enum";
import { SupplierModel } from "../models/supplier.model";
import { AgreementRepository } from "./agreement.repository";
export declare class BidRepository {
    private readonly _model;
    private readonly _agreementRepository;
    constructor(_model: Model<BidModel>, _agreementRepository: AgreementRepository);
    register(dto: BideRegisterDto): Promise<BidModel>;
    getByAgreementId(_id: string): Promise<BidModel[]>;
    getByReviewerId(_id: string): Promise<BidModel[]>;
    update(_id: string, dto: BidUpdateDto): Promise<BidModel>;
    updateStatus(_id: string, dto: BidUpdateStatusRequestDto): Promise<BidModel>;
    changeStatus(_id: string, dto: BidChangeStatusRequestDto): Promise<BidModel>;
    addProposal(_id: string, dto: BidAddProposalDto): Promise<BidModel>;
    listAllotmentByBidId(_id: string): Promise<any[]>;
    listNonDeletedBids(): Promise<BidModel[]>;
    listBidByStatus(status: BidStatusEnum): Promise<BidModel[]>;
    listForDashboard(): Promise<BidModel[]>;
    list(): Promise<BidModel[]>;
    getById(_id: string): Promise<BidModel>;
    getBidById(_id: string): Promise<BidModel>;
    deleteById(_id: string): Promise<BidModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    rotineStatus(_id: string, status: string): Promise<BidModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    addStartHour(_id: string, hour: string): Promise<BidModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    addEndHour(_id: string, hour: string): Promise<BidModel & {
        _id: mongoose.Types.ObjectId;
    }>;
    listForSupplier(_id: string): Promise<BidModel[]>;
    listByIds(ids: string[]): Promise<BidModel[]>;
    sendTieBreaker(_id: string, suppliers: SupplierModel[]): Promise<BidModel>;
    listWithoutConcluded(): Promise<BidModel[]>;
    count(): Promise<number>;
}
