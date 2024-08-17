import { RegistryRepository } from "../repositories/registry.repository";
import { RegistrySendRequestDto } from "../dtos/registry-send-request.dto";
export declare class RegistryService {
    private readonly _registryRepository;
    private readonly _logger;
    constructor(_registryRepository: RegistryRepository);
    send(dto: RegistrySendRequestDto): Promise<string>;
}
