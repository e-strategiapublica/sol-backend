import { Logger } from "@nestjs/common";
import { UserService } from "../../SOL/services/user.service";
import { AssociationService } from "../../SOL/services/association.service";
export declare class DatabaseSeedCommand {
    private readonly _userService;
    private readonly _associationService;
    logger: Logger;
    constructor(_userService: UserService, _associationService: AssociationService);
    seed(): Promise<void>;
}
