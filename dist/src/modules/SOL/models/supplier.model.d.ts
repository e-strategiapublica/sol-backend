import { Document } from "mongoose";
import { SupplierInterface } from "../interfaces/supplier.interface";
export interface SupplierModel extends SupplierInterface, Document {
}
