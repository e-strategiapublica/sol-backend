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
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { TutorialLocationEnum } from "../enums/tutorial-location.enum";
export declare class TutorialRepository<TutorialInterface> {
    private readonly model;
    constructor(model: Model<TutorialInterface>);
    getByScreenLocationWithoutUserId(screenLocation: TutorialLocationEnum, userId: string): Promise<import("mongoose").HydratedDocument<TutorialInterface, {}, {}>>;
    getByScreenLocation(screenLocation: TutorialLocationEnum): Promise<import("mongoose").HydratedDocument<TutorialInterface, {}, {}>>;
    addCompletion(id: string, userId: string): Promise<import("mongoose").HydratedDocument<TutorialInterface, {}, {}>>;
    delete(_id: string): Promise<void>;
}
