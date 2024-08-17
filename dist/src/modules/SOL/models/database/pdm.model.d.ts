export declare class PdmModel {
    private url;
    private dbName;
    private collection;
    list(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    savePdm(dto: any): Promise<void>;
    verifyCodeExists(code: number): Promise<void>;
    deleteById(_id: string): Promise<void>;
    updatePdm(id: any, dto: any): Promise<void>;
    getById(_id: string): Promise<any>;
}
