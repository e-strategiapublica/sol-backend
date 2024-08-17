import { AddressRegisterDto } from "src/shared/dtos/address-register.dto";
import { LegalRepresentativeRegisterDto } from "src/shared/dtos/legal-representative-register.dto";
export declare abstract class AssociationRegisterRequestDto {
    name: string;
    cnpj: string;
    address: AddressRegisterDto;
    legalRepresentative: LegalRepresentativeRegisterDto;
}
