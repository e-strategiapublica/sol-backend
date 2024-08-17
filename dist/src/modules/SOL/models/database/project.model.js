"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const error_manager_1 = require("../../../../shared/utils/error.manager");
let ProjectModel = class ProjectModel {
    constructor() {
        this.url = process.env.NOSQL_CONNECTION_STRING;
        this.dbName = process.env.DATABASE;
        this.collection = "project";
    }
    async getProjectByName(name) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            return await collection.findOne({ 'name': name });
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
};
ProjectModel = __decorate([
    (0, common_1.Injectable)()
], ProjectModel);
exports.ProjectModel = ProjectModel;
//# sourceMappingURL=project.model.js.map