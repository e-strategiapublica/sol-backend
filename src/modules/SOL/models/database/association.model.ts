import { Injectable, HttpStatus } from "@nestjs/common";
import { MongoClient, ObjectId } from 'mongodb';
import { ErrorManager } from "../../../../shared/utils/error.manager";
import { AssociationStatusEnum } from "../../enums/association-status.enum";

@Injectable()
export class MyAssociationModel {

    private url: string = process.env.NOSQL_CONNECTION_STRING;
    private dbName: string = process.env.DATABASE;
    private collection: string = "association";

    async getAssociation(name: string, cnpj: string, active: boolean = true) {

        const client = new MongoClient(this.url);

        try {
            await client.connect();

            const db = client.db(this.dbName);
            const collection = db.collection(this.collection);
            
            const cnpjSemPontuacao = cnpj.replace(/[^\d]+/g, '');
            const cnpjRegex = new RegExp(`^${cnpjSemPontuacao}$`, 'i');

            return await collection.findOne({
                $and: [
                    { $or: [{ 'name': name }, { 'cnpj': cnpjRegex }] },
                    { 'status': active ? AssociationStatusEnum.active : AssociationStatusEnum.inactive }
                ]
            });

        } catch (error) {
            throw ErrorManager.createError(error)
        } finally {
            await client.close();
        }

    }

}