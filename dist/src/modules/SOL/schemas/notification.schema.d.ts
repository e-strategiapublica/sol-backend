import mongoose from "mongoose";
export declare class Notification {
    title: string;
    description: string;
    from_user: string;
    deleted: boolean;
    bid_id: string;
}
export declare const NotificationSchema: mongoose.Schema<Notification, mongoose.Model<Notification, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Notification>;
