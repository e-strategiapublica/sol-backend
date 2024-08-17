export declare class MyAssociationModel {
    private url;
    private dbName;
    private collection;
    getAssociation(name: string, cnpj: string, active?: boolean): Promise<import("mongodb").WithId<import("bson").Document>>;
}
