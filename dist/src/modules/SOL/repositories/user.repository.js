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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongodb_1 = require("mongodb");
let UserRepository = class UserRepository {
    constructor(_model) {
        this._model = _model;
        this.url = process.env.NOSQL_CONNECTION_STRING;
        this.dbName = process.env.DATABASE;
        this.collection = "user";
    }
    async getByEmail(email) {
        return await this._model
            .findOne({ email });
    }
    async getByPhone(phone) {
        return await this._model
            .findOne({ phone });
    }
    async getByDocument(document) {
        return await this._model
            .findOne({ document });
    }
    async getAll() {
        return await this._model
            .find();
    }
    async getById(_id) {
        return await this._model
            .findById({ _id }).populate('association').populate('supplier');
    }
    async getByIdPopulate(_id) {
        return await this._model
            .findById({ _id }).populate('association').populate('supplier');
    }
    async getUserBySupplierId(_id) {
        return await this._model
            .find({ supplier: _id }).populate('association');
    }
    async listByType(type) {
        return await this._model.find({ type }).populate('association');
    }
    async listByRole(role) {
        return await this._model.find({ roles: role });
    }
    async register(dto) {
        const client = new mongodb_1.MongoClient(this.url);
        await client.connect();
        const db = client.db(this.dbName);
        const collection = db.collection(this.collection);
        const res = await collection.findOne({ "email": dto.email });
        await client.close();
        if (!res) {
            const data = await new this._model(dto);
            return data.save();
        }
    }
    async updatePassword(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                password: dto.password
            }
        });
    }
    async updateNotifications(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $push: {
                notification_list: dto
            }
        });
    }
    async update(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                name: dto.name,
            }
        });
    }
    async updateById(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                email: dto.email,
                name: dto.name,
                phone: dto.phone,
                type: dto.type,
                document: dto.document,
                office: dto.office,
                association: dto.association,
                supplier: dto.supplier,
                roles: dto.roles
            }
        });
    }
    async updateRefreshToken(_id, refreshToken) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                refreshToken
            }
        });
    }
    async registerPassword(_id, dto) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                password: dto.password,
                status: dto.status
            }
        });
    }
    async updateStatus(_id, status) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                status
            },
        });
    }
    async addDeviceToken(token, id) {
        await this._model.findByIdAndUpdate(id, {
            $push: {
                pushNotificationToken: token
            }
        });
    }
    async removeDeviceToken(token, id) {
        await this._model.findByIdAndUpdate(id, {
            $pull: {
                'pushNotificationToken': token
            }
        });
    }
    async updateProfilePicture(_id, profilePicture) {
        return await this._model.findOneAndUpdate({ _id }, {
            $set: {
                profilePicture
            },
        });
    }
    async deleteById(_id) {
        return await this._model.findOneAndDelete({ _id });
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map