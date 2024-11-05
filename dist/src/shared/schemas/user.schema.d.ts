import mongoose from "mongoose";
// import { Supplier } from "./supplier.schema";

export declare class User {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: string;  // Exemplo: "admin", "user"
    // suppliers: Supplier[];  // Relacionamento com fornecedores
}

export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User>;
