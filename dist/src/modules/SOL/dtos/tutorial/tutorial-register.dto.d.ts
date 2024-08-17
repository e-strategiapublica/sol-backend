import { TutorialLocationEnum } from "../../enums/tutorial-location.enum";
import { TutorialTypeEnum } from "../../enums/tutorial-type.enum";
export declare abstract class TutorialCreateDto {
    name: string;
    screenLocation: TutorialLocationEnum;
    type: TutorialTypeEnum;
    question: string;
    alternatives: string[];
    correctAnswer: string;
    text: string;
    videoLink: string;
}
