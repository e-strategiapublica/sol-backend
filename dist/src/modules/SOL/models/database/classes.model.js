"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesModel = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const error_manager_1 = require("../../../../shared/utils/error.manager");
let ClassesModel = class ClassesModel {
    constructor() {
        this.url = process.env.NOSQL_CONNECTION_STRING;
        this.dbName = process.env.DATABASE;
        this.collection = "classes";
    }
    async list() {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            const res = await collection.find({}).project({ _id: 1, code: 1, description: 1, 'group._id': 1, 'group.code': 1, 'group.segment': 1 }).toArray();
            if (!res.length) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'There is no classes', 1);
            }
            return res;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async saveClass(dto) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            const date = new Date();
            dto.createdAt = date;
            dto.updatedAt = date;
            const res = await collection.insertOne(dto);
            if (res.acknowledged == false) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'Error inserting class', 2);
            }
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async updateClass(id, dto) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            dto.updatedAt = new Date();
            const res = await collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: dto });
            if (res.acknowledged == true && !res.modifiedCount) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'The class does not exist', 1);
            }
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async deleteById(_id) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            const res = await collection.findOneAndDelete({ _id: new mongodb_1.ObjectId(_id) });
            if (!res) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'The class does not exist', 1);
            }
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async verifyCodeExists(code) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            const res = await collection.findOne({ 'code': code });
            if (res) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'The code exists', 1);
            }
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
};
ClassesModel = __decorate([
    (0, common_1.Injectable)()
], ClassesModel);
exports.ClassesModel = ClassesModel;
//# sourceMappingURL=classes.model.js.map