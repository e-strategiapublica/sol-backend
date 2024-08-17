/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TutorialLocationEnum } from '../enums/tutorial-location.enum';
import { TutorialTypeEnum } from '../enums/tutorial-type.enum';
import { User } from './user.schema';
export declare class Tutorial {
    name: string;
    screenLocation: TutorialLocationEnum;
    screenBlock: boolean;
    type: TutorialTypeEnum;
    question: string;
    alternatives: string[];
    correctAnswer: string;
    text: string;
    videoLink: string;
    usersWhoCompleted: User[];
}
export declare const TutorialSchema: import("mongoose").Schema<Tutorial, import("mongoose").Model<Tutorial, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tutorial>;
