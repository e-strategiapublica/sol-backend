"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DatabaseSeedCommand_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeedCommand = void 0;
const common_1 = require("@nestjs/common");
const nestjs_command_1 = require("nestjs-command");
const user_service_1 = require("../../SOL/services/user.service");
const user_type_enum_1 = require("../../SOL/enums/user-type.enum");
const user_roles_enum_1 = require("../../SOL/enums/user-roles.enum");
const user_status_enum_1 = require("../../SOL/enums/user-status.enum");
const association_service_1 = require("../../SOL/services/association.service");
const marital_status_enum_1 = require("../../SOL/enums/marital-status.enum");
let DatabaseSeedCommand = DatabaseSeedCommand_1 = class DatabaseSeedCommand {
    constructor(_userService, _associationService) {
        this._userService = _userService;
        this._associationService = _associationService;
        this.logger = new common_1.Logger(DatabaseSeedCommand_1.name);
    }
    async seed() {
        try {
            const association = await this._associationService.register({
                name: 'associação principal',
                cnpj: '57.964.193/0001-18',
                address: {
                    zipCode: '01124020',
                    publicPlace: 'rua salvador leme',
                    neighborhood: 'bom retiro',
                    city: 'são paulo',
                    state: 'sp',
                    latitude: '-23.5272227',
                    longitude: '-46.6347055',
                    complement: '',
                    referencePoint: '',
                    number: '100',
                },
                legalRepresentative: {
                    name: 'admin',
                    nationality: 'brasileiro',
                    maritalStatus: marital_status_enum_1.MaritalStatusEnum.solteiro,
                    cpf: '11111111111',
                    rg: '111111111',
                    document_origin: 'ssprs',
                    validityData: new Date(),
                    address: {
                        zipCode: '01124020',
                        publicPlace: 'rua salvador leme',
                        neighborhood: 'bom retiro',
                        city: 'são paulo',
                        state: 'sp',
                        latitude: '-23.5272227',
                        longitude: '-46.6347055',
                        complement: '',
                        referencePoint: '',
                        number: '100',
                    },
                }
            });
            const admin = await this._userService.register({
                email: 'admin@lacchain.com',
                name: 'administrador',
                phone: '011313121545',
                document: '1111111110',
                office: 'admin1',
                association: association._id,
                roles: user_roles_enum_1.UserRolesEnum.geral,
                type: user_type_enum_1.UserTypeEnum.administrador,
                status: user_status_enum_1.UserStatusEnum.inactive,
            });
            await this._userService.registerPassword(admin._id, {
                email: admin.email,
                status: user_status_enum_1.UserStatusEnum.active,
                password: 'P@ssw0rd',
            });
            console.log('seed finished');
        }
        catch (error) {
            console.error(error);
        }
    }
};
__decorate([
    (0, nestjs_command_1.Command)({ command: 'seed:database', describe: 'seed database' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseSeedCommand.prototype, "seed", null);
DatabaseSeedCommand = DatabaseSeedCommand_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        association_service_1.AssociationService])
], DatabaseSeedCommand);
exports.DatabaseSeedCommand = DatabaseSeedCommand;
//# sourceMappingURL=database-seed.command.js.map