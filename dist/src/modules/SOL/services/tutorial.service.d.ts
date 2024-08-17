import { TutorialInterface } from '../interfaces/tutorial.interface';
import { TutorialLocationEnum } from "../enums/tutorial-location.enum";
import { TutorialRepository } from "../repositories/tutorial.repository";
export declare class TutorialService {
    private readonly _tutorialRepository;
    constructor(_tutorialRepository: TutorialRepository<TutorialInterface>);
    getByScreenLocationWithUserId(screenLocation: TutorialLocationEnum): Promise<TutorialInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addCompletion(id: string, userId: string): Promise<TutorialInterface & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
