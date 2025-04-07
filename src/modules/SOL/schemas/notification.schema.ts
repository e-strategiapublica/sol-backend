import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Bids } from "./bids.schema";

@Schema({ timestamps: true, collection: Notification.name.toLowerCase() })
export class Notification {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  from_user: string;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: String })
  bid_id: string;
}
export const NotificationSchema = SchemaFactory.createForClass(Notification);
