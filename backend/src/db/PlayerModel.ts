import mongoose, { Schema } from "mongoose";

export const PlayerSchema: Schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    country: { type: String }
});

export const PlayerModel = mongoose.model('PlayerModel', PlayerSchema);