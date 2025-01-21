import {UserModel} from "./UserModel";
import {mockUsers, mockTournaments} from "../../mockdata/mockUsers";
import {mockMatches} from "../../mockdata/mockUsers";
import {TournamentModel} from "./TournamentModel";
import {MatchModel} from "./Matchmodel";
import {User} from "../models/User";
import {Match} from "../models/Match";
import {Tournament} from "../models/Tournament";
import {PlayerModel} from "./PlayerModel";
import {mockPlayers} from "../../mockdata/mockPlayers";


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
