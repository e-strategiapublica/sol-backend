import { Document } from "mongoose";
import { GroupInterface } from "../interfaces/group.interface";
export interface GroupModel extends GroupInterface, Document {
}
