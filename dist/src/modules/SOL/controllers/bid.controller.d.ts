/// <reference types="multer" />
import { ResponseDto } from "src/shared/dtos/response.dto";
import { BideRegisterDto } from "../dtos/bid-register-request.dto";
import { BidService } from "../services/bid.service";
import { BidUpdateDto } from "../dtos/bid-update-request.dto";
import { BidUpdateStatusRequestDto } from "../dtos/bid-update-status-request.dto";
import { BidAddProposalDto } from "../dtos/bid-add-proposal.dto";
import { BidDateUpdateDto } from "../dtos/bid-date-update.dto";
import { LacchainModel } from "../models/blockchain/lacchain.model";
import { BidHistoryModel } from "../models/database/bid_history.model";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
export declare class BidController {
    private readonly bidsService;
    private _lacchainModel;
    private _bidHistoryModel;
    private readonly configService;
    private readonly logger;
    constructor(bidsService: BidService, _lacchainModel: LacchainModel, _bidHistoryModel: BidHistoryModel, configService: ConfigService);
    register(request: any, dto: BideRegisterDto, files: Array<Express.Multer.File>, authorizationHeader: string): Promise<ResponseDto>;
    list(): Promise<ResponseDto>;
    listForSupplier(request: any): Promise<ResponseDto>;
    listForProposalSupplier(request: any): Promise<ResponseDto>;
    getById(_id: string): Promise<ResponseDto>;
    listAllotmentBydBidId(_id: string): Promise<ResponseDto>;
    getByManagerOrRevieweId(_id: string): Promise<ResponseDto>;
    findAgreementByReviewerId(_id: string): Promise<ResponseDto>;
    findAgreementByViewerId(_id: string): Promise<ResponseDto>;
    findAgreementByProjectManagerId(_id: string): Promise<ResponseDto>;
    listBydAssociation(request: any): Promise<ResponseDto>;
    updateById(_id: string, dto: BidUpdateDto): Promise<ResponseDto>;
    updateOpenDate(_id: string, dto: BidDateUpdateDto): Promise<ResponseDto>;
    updateStatus(_id: string, dto: BidUpdateStatusRequestDto, request: any, authorizationHeader: string): Promise<ResponseDto>;
    addProposal(_id: string, dto: BidAddProposalDto): Promise<ResponseDto>;
    deleteById(_id: string): Promise<ResponseDto>;
    download(response: any, id: string, type: string): Promise<void>;
    bidPdf(id: string, type: string): Promise<ResponseDto>;
    createDocument(_id: string, language: string, type: string, res: Response): Promise<void>;
    report(id: string): Promise<ResponseDto>;
    getBidData(request: any, bidId: string): Promise<import("mongodb").WithId<import("bson").Document>[] | {
        type: string;
        message: string;
    }>;
}
