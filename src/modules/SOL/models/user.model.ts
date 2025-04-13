import { Document } from "mongoose";
import { UserInterface } from "../interfaces/user.interface";
import { User } from "../schemas/user.schema";

export interface UserModel extends UserInterface, Document {}
export type UserDocument = User & Document;
