export declare class ClassesModel {
    private url;
    private dbName;
    private collection;
    list(): Promise<import("bson").Document[]>;
    saveClass(dto: any): Promise<void>;
    updateClass(id: any, dto: any): Promise<void>;
    deleteById(_id: string): Promise<void>;
    verifyCodeExists(code: number): Promise<void>;
}
