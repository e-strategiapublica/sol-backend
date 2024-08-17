import { Document } from "mongoose";
import { ItemsInterface } from "../interfaces/items.interface";

export interface ItemsModel extends ItemsInterface, Document{
}