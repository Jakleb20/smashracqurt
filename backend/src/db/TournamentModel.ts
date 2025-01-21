import mongoose, { Schema } from "mongoose";
import {MatchSchema} from "./Matchmodel";
import {UserSchema} from "./UserModel";

export const TournamentSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    prize: { type: Number, required: true },
    users: {type: [UserSchema], required: true},
    matches: {type: [MatchSchema], required: true}
});

export const TournamentModel = mongoose.model('TournamentModel', TournamentSchema);
