export declare class ProjectModel {
    private url;
    private dbName;
    private collection;
    getProjectByName(name: string): Promise<import("mongodb").WithId<import("bson").Document>>;
}
