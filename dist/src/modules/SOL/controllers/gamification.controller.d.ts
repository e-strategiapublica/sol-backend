import { GamificationService, UserRanking } from '../services/gamification.service';
import { AddPointsDto } from '../dtos/addpoints.dto';
import { Gamification } from '../schemas/gamification.schema';
export declare class GamificationController {
    private readonly gamificationService;
    constructor(gamificationService: GamificationService);
    getAllGamification(): Promise<Gamification[]>;
    getGamification(userId: string): Promise<Gamification[]>;
    addPoints(addPointsDto: AddPointsDto): Promise<Gamification>;
    getRanking(): Promise<UserRanking[]>;
}
