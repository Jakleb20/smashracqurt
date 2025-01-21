import mongoose, { Schema } from "mongoose";
import {TournamentSchema} from "./TournamentModel";
import {MatchSchema} from "./Matchmodel";

export const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    users: { type: [TournamentSchema], required: true },
    matches: { type: [MatchSchema], required: true }
});

export const UserModel = mongoose.model('UserModel', UserSchema);
