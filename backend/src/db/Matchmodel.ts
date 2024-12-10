import mongoose, { Schema } from "mongoose";

const MatchSchema: Schema = new Schema({
    id: { type: Number, required: true },
    player: { type: String, required: true }, // Referenz auf Benutzername
    player2: { type: String, required: true },
    score1: { type: Number, required: true },
    score2: { type: Number, required: true },
    date: { type: String, required: true },
    finished: { type: Boolean, required: true }
});

export const MatchModel = mongoose.model('MatchModel', MatchSchema);
