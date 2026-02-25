import mongoose, { Document, Schema } from "mongoose";

export interface IAccountDocument extends Document {
    email: string;
    password: string;
    createAt: Date;
    updateAt: Date;
}

const accountSchema = new Schema<IAccountDocument>(
    {
        email: { type: String, required: true},
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

export const AccountModel = mongoose.model<IAccountDocument>("Account", accountSchema);