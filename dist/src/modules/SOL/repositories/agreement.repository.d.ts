import { Model } from "mongoose";
import { AgreementRegisterRequestDto } from "../dtos/agreement-register-request.dto";
import { AgreementModel } from "../models/agreement.model";
export declare class AgreementRepository {
    private readonly _model;
    constructor(_model: Model<AgreementModel>);
    findById(id: string): Promise<AgreementModel>;
    findAgreementByReviewerOrManagerId(_id: string): Promise<AgreementModel[]>;
    findAgreementByReviewerId(_id: string): Promise<AgreementModel[]>;
    findAgreementByManagerId(_id: string): Promise<AgreementModel[]>;
    findAgreementByProjectId(_id: string): Promise<AgreementModel>;
    deleteById(id: string): Promise<AgreementModel>;
    register(dto: AgreementRegisterRequestDto): Promise<AgreementModel>;
    findAll(): Promise<AgreementModel[]>;
    findAgreementsWithOutProject(array: string[]): Promise<AgreementModel[]>;
    findAgreementsWithProject(array: string[]): Promise<AgreementModel[]>;
    findForAssociation(associationId: string): Promise<AgreementModel[]>;
    findForGerenteGeralProjetos(projectManagerId: string): Promise<AgreementModel[]>;
    findForReviewer(reviewerId: string): Promise<AgreementModel[]>;
    findByProjectId(projectId: string): Promise<AgreementModel[]>;
    addManager(id: string, dto: any): Promise<AgreementModel>;
    update(id: string, dto: any): Promise<AgreementModel>;
}
