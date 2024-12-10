"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = void 0;
const UserModel_1 = require("./UserModel");
const mockUsers_1 = require("../../mockdata/mockUsers");
const mockUsers_2 = require("../../mockdata/mockUsers");
const TournamentModel_1 = require("./TournamentModel");
const Matchmodel_1 = require("./Matchmodel");
const initDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Bereinigung der Datenbank
        yield UserModel_1.UserModel.deleteMany();
        yield TournamentModel_1.TournamentModel.deleteMany();
        yield Matchmodel_1.MatchModel.deleteMany();
        yield Matchmodel_1.MatchModel.insertMany(mockUsers_2.mockMatches);
        yield UserModel_1.UserModel.insertMany(mockUsers_1.mockUsers);
        yield TournamentModel_1.TournamentModel.insertMany(mockUsers_1.mockTournaments);
    }
    catch (error) {
        console.log("### error on inserting: ", error);
    }
});
exports.initDB = initDB;
