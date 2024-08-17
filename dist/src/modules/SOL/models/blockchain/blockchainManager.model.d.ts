import { LacchainModel } from "./lacchain.model";
export declare class BlockchainManager {
    private lacchainModel;
    constructor(lacchainModel: LacchainModel);
    getData(): Promise<void>;
    setData(): Promise<void>;
}
