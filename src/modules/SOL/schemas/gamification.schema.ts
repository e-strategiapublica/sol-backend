import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Reward {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: string;
}

@Schema()
export class Gamification extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 })
  points: number;

  @Prop({ default: [] })
  rewards: Reward[];

  @Prop({ default: 1 })
  level: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const GamificationSchema = SchemaFactory.createForClass(Gamification);
