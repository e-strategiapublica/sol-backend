import { MaritalStatusEnum } from 'src/modules/SOL/enums/marital-status.enum';
import { AddressRegisterDto } from './address-register.dto';
export declare class LegalRepresentativeRegisterDto {
    name: string;
    nationality: string;
    maritalStatus: MaritalStatusEnum;
    cpf: string;
    rg: string;
    document_origin: string;
    validityData: Date;
    address: AddressRegisterDto;
}
