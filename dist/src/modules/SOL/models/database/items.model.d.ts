export declare class ItemsModel {
    private url;
    private dbName;
    private collection;
    list(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    saveItem(dto: any): Promise<void>;
    verifyCodeExists(code: number): Promise<void>;
    deleteById(_id: string): Promise<void>;
    updateItem(_id: any, dto: any): Promise<void>;
    getById(_id: string): Promise<any>;
    updateItemByUpdatedPdm(_id: any, name: any, propertyList: any): Promise<void>;
    listByIds(_ids: any): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getByName(name: string): Promise<import("mongodb").WithId<import("bson").Document>>;
}
