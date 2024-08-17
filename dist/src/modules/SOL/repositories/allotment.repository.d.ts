import { Model } from "mongoose";
import { AllotmentModel } from "../models/allotment.model";
import { AllotmentRegisterDto } from "../dtos/allotment-register-request.dto";
import { ItemRequestDto } from "../dtos/item-register-request.dto";
import { ProposalInAllotmentRequestDto } from "../dtos/proposal-in-allotment-request.dto";
import { AllotmentStatusEnum } from "../enums/allotment-status.enum";
export declare class AllotmentRepository {
    private readonly _model;
    constructor(_model: Model<AllotmentModel>);
    register(dto: AllotmentRegisterDto): Promise<AllotmentModel>;
    list(): Promise<AllotmentModel[]>;
    listById(_id: string): Promise<AllotmentModel>;
    listByIds(_ids: string[]): Promise<AllotmentModel[]>;
    update(_id: any, dto: AllotmentRegisterDto): Promise<AllotmentModel>;
    editUpdate(_id: any, dto: AllotmentRegisterDto): Promise<AllotmentModel>;
    updateStauts(_id: any, status: AllotmentStatusEnum): Promise<AllotmentModel>;
    addProposal(_id: any, dto: ProposalInAllotmentRequestDto[]): Promise<AllotmentModel>;
    updateProposal(_id: string, dto: any): Promise<AllotmentModel>;
    updateItem(_id: string, dto: ItemRequestDto): Promise<AllotmentModel>;
    removeProposal(_id: string): Promise<AllotmentModel>;
    updateStatusByIds(_ids: string[], status: AllotmentStatusEnum): Promise<any>;
}
