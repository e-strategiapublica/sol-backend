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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRepository = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const enviroment_variables_enum_1 = require("../../../shared/enums/enviroment.variables.enum");
let FileRepository = class FileRepository {
    constructor(_configService) {
        this._configService = _configService;
    }
    upload(filename, base64) {
        const bucket = this._configService.get(enviroment_variables_enum_1.EnviromentVariablesEnum.BUCKET);
        const path = bucket + '/' + filename;
        const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(path, base64Data, { encoding: 'base64' });
        return path;
    }
    async download(filename) {
        const pdf = await new Promise((resolve, reject) => {
            fs.readFile(filename, {}, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
        return pdf;
    }
};
FileRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileRepository);
exports.FileRepository = FileRepository;
//# sourceMappingURL=file.repository.js.map