import { Document } from "mongoose";
import { BidInterface } from "../interfaces/bid.interface";

export interface BidModel extends BidInterface, Document {}