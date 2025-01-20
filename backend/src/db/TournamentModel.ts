import mongoose, { Schema } from "mongoose";

const TournamentSchema: Schema = new Schema({
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'UserModel' }], // Referenz auf Benutzer
    matches: [{ type: Schema.Types.ObjectId, ref: 'MatchModel' }], // Referenz auf Matches
    prize: { type: Number, required: true }
});

export const TournamentModel = mongoose.model('TournamentModel', TournamentSchema);
