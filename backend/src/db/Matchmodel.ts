import mongoose, { Schema } from "mongoose";
import {PlayerModel, PlayerSchema} from "./PlayerModel";

export const MatchSchema: Schema = new Schema({
    player: {type: PlayerSchema, required: true},
    player2: {type: PlayerSchema, required: true},
    score: { type: [[Number]], required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    finished: { type: Boolean, required: true }
});

export const MatchModel = mongoose.model('MatchModel', MatchSchema);