export declare class BidHistoryModel {
    private url;
    private dbName;
    private collection;
    insert(bidHistoryId: any, data: any, txHash: any): Promise<void>;
    listByBidId(bidId: any): Promise<import("mongodb").WithId<import("bson").Document>[]>;
}
