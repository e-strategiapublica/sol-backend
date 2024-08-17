"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAssociationModel = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const error_manager_1 = require("../../../../shared/utils/error.manager");
const association_status_enum_1 = require("../../enums/association-status.enum");
let MyAssociationModel = class MyAssociationModel {
    constructor() {
        this.url = process.env.NOSQL_CONNECTION_STRING;
        this.dbName = process.env.DATABASE;
        this.collection = "association";
    }
    async getAssociation(name, cnpj, active = true) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            const cnpjSemPontuacao = cnpj.replace(/[^\d]+/g, '');
            const cnpjRegex = new RegExp(`^${cnpjSemPontuacao}$`, 'i');
            return await collection.findOne({
                $and: [
                    { $or: [{ 'name': name }, { 'cnpj': cnpjRegex }] },
                    { 'status': active ? association_status_enum_1.AssociationStatusEnum.active : association_status_enum_1.AssociationStatusEnum.inactive }
                ]
            });
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
};
MyAssociationModel = __decorate([
    (0, common_1.Injectable)()
], MyAssociationModel);
exports.MyAssociationModel = MyAssociationModel;
//# sourceMappingURL=association.model.js.map