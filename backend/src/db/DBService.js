"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const PlayerModel_1 = require("./PlayerModel");
const mockPlayers_1 = require("../../mockdata/mockPlayers");
const UserModel_1 = require("./UserModel");
const mockUsers_1 = require("../../mockdata/mockUsers");
const mockMatches_1 = require("../../mockdata/mockMatches");
const TournamentModel_1 = require("./TournamentModel");
const mockTournaments_1 = require("../../mockdata/mockTournaments");
const Matchmodel_1 = require("./Matchmodel");
const initDB = () => {
    try {
        UserModel_1.UserModel.deleteMany();
        PlayerModel_1.PlayerModel.deleteMany();
        Matchmodel_1.MatchModel.deleteMany();
        TournamentModel_1.TournamentModel.deleteMany();
        PlayerModel_1.PlayerModel.insertMany(mockPlayers_1.mockPlayers);
        UserModel_1.UserModel.insertMany(mockUsers_1.mockUsers);
        Matchmodel_1.MatchModel.insertMany(mockMatches_1.mockMatches);
        TournamentModel_1.TournamentModel.insertMany(mockTournaments_1.mockTournaments);
        console.log("Mock data inserted successfully!");
    }
    catch (error) {
        console.error("Error inserting mock data:", error);
        process.exit(1);
    }
};
exports.initDB = initDB;
