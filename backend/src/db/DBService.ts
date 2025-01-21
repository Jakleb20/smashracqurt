import mongoose from "mongoose";
import {PlayerModel} from "./PlayerModel";
import {mockPlayers} from "../../mockdata/mockPlayers";
import {UserModel} from "./UserModel";
import {mockUsers} from "../../mockdata/mockUsers";
import {mockMatches} from "../../mockdata/mockMatches";
import {TournamentModel} from "./TournamentModel";
import {mockTournaments} from "../../mockdata/mockTournaments";
import {MatchModel} from "./Matchmodel";



export const initDB = () => {
    try {
        UserModel.deleteMany();
        PlayerModel.deleteMany();
        MatchModel.deleteMany();
        TournamentModel.deleteMany();

        PlayerModel.insertMany(mockPlayers);
        UserModel.insertMany(mockUsers);
        MatchModel.insertMany(mockMatches);
        TournamentModel.insertMany(mockTournaments);

        console.log("Mock data inserted successfully!");
    } catch (error) {
        console.error("Error inserting mock data:", error);
        process.exit(1);
    }
};
