import { Model } from 'mongoose';
import { Gamification } from '../schemas/gamification.schema';
import { AddPointsDto } from '../dtos/addpoints.dto';
export interface UserRanking {
    id: string;
    name: string;
    email: string;
    points: number;
}
export declare class GamificationService {
    private gamificationModel;
    constructor(gamificationModel: Model<Gamification>);
    getUserGamification(userId: string): Promise<Gamification[]>;
    getAllGamification(): Promise<Gamification[]>;
    addPoints(addPointsDto: AddPointsDto): Promise<Gamification>;
    getRanking(): Promise<UserRanking[]>;
}
