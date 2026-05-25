import mongoose, {Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    lastname: string;
    role: 'admin' | 'tecnico';
    email: string;
    active: boolean;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    lastname: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Tecnico'],
        default: 'Tecnico'
    },
    active: {
        type: Boolean,
        default: true
    }

}, {timestamps: true});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;