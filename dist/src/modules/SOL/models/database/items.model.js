"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsModel = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const error_manager_1 = require("../../../../shared/utils/error.manager");
const moment = require("moment");
let ItemsModel = class ItemsModel {
    constructor() {
        this.url = process.env.NOSQL_CONNECTION_STRING;
        this.dbName = process.env.DATABASE;
        this.collection = "items";
    }
    async list() {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            const res = await collection.find({}).toArray();
            if (!res.length) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'There is no items', 1);
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
    async saveItem(dto) {
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
    async deleteById(_id) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            const res = await collection.findOneAndDelete({ _id: new mongodb_1.ObjectId(_id) });
            if (!res) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'The item does not exist', 1);
            }
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async updateItem(_id, dto) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            dto.updatedAt = new Date();
            const res = await collection.updateOne({ _id: new mongodb_1.ObjectId(_id) }, {
                $set: {
                    "name": dto.name,
                    "propertyListValue": dto.propertyListValue
                }
            });
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async getById(_id) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            let res;
            res = await collection.findOne({ _id: new mongodb_1.ObjectId(_id) });
            if (!res) {
                throw new error_manager_1.ErrorManager(common_1.HttpStatus.BAD_REQUEST, 'The item does not exist', 1);
            }
            res = await collection.findOne({ _id: new mongodb_1.ObjectId(_id) });
            res.createdAt = moment(res.createdAt).format('YYYY-MM-DD HH:mm:ss');
            return res;
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async updateItemByUpdatedPdm(_id, name, propertyList) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            let res;
            const date = new Date();
            res = await collection.findOne({ "pdm._id": _id });
            let _propertyListValue = [];
            if (res) {
                let found;
                for (let i = 0; i < propertyList.length; i++) {
                    found = 0;
                    for (let j = 0; j < res.propertyListValue.length; j++) {
                        if (res.propertyListValue[j].property == propertyList[i].property) {
                            found = 1;
                            _propertyListValue.push(res.propertyListValue[j]);
                        }
                    }
                    if (!found) {
                        _propertyListValue.push({ "property": propertyList[i].property, "value": "" });
                    }
                }
                await collection.updateMany({ "pdm._id": _id }, {
                    $set: {
                        "pdm.name": name,
                        "updatedAt": date,
                        "propertyListValue": _propertyListValue
                    }
                });
            }
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async listByIds(_ids) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            return await collection.find({
                $or: _ids
            }).toArray();
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
    async getByName(name) {
        const client = new mongodb_1.MongoClient(this.url);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            return await collection.findOne({ name: name });
        }
        catch (error) {
            throw error_manager_1.ErrorManager.createError(error);
        }
        finally {
            await client.close();
        }
    }
};
ItemsModel = __decorate([
    (0, common_1.Injectable)()
], ItemsModel);
exports.ItemsModel = ItemsModel;
//# sourceMappingURL=items.model.js.map