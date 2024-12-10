import {UserModel} from "./UserModel";
import {mockUsers, mockTournaments} from "../../mockdata/mockUsers";
import {mockMatches} from "../../mockdata/mockUsers";
import {TournamentModel} from "./TournamentModel";
import {MatchModel} from "./Matchmodel";
import {User} from "../models/User";
import {Match} from "../models/Match";
import {Tournament} from "../models/Tournament";


export const initDB = async (): Promise<void> => {
    try {
        // Bereinigung der Datenbank
        await UserModel.deleteMany();
        await TournamentModel.deleteMany();
        await MatchModel.deleteMany();

        await MatchModel.insertMany(mockMatches);
        await UserModel.insertMany(mockUsers);
        await TournamentModel.insertMany(mockTournaments)

    } catch (error) {
        console.log("### error on inserting: ", error);
    }
}