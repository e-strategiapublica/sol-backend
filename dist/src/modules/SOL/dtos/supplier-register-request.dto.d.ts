import { SuplierTypeEnum } from "../enums/supplier-type.enum";
import { Address } from "src/shared/schemas/address.schema";
import { LegalRepresentative } from "src/shared/schemas/legal-representative.schema";
import { CategoryInterface } from "../interfaces/category.interface";
export declare abstract class SupplierRegisterDto {
    name: string;
    cpf: string;
    type: SuplierTypeEnum;
    address: Address;
    legal_representative: LegalRepresentative;
    group_id: string[];
    categoriesId: string[];
    categories: CategoryInterface[];
    blocked: boolean;
}
