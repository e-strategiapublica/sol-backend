import { ResponseDto } from '../../../shared/dtos/response.dto';
import { TutorialLocationEnum } from '../enums/tutorial-location.enum';
import { TutorialService } from '../services/tutorial.service';
export declare class TutorialController {
    private readonly _tutorialService;
    constructor(_tutorialService: TutorialService);
    getByScreenLocation(screenLocation: TutorialLocationEnum, request: any): Promise<ResponseDto>;
    addCompletion(request: any, id: string): Promise<ResponseDto>;
}
