"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTournaments = exports.mockdata = exports.mockMatches = void 0;
// Mock Matches
exports.mockMatches = [
    {
        id: 1,
        player: "mosdab20",
        player2: "bogbeb19",
        score1: 3,
        score2: 2,
        date: "2023-09-15",
        finished: true
    },
    {
        id: 2,
        player: "jakleb20",
        player2: "makac30",
        score1: 1,
        score2: 4,
        date: "2023-09-16",
        finished: true
    },
    {
        id: 3,
        player: "mosdab20",
        player2: "user9",
        score1: 2,
        score2: 2,
        date: "2023-09-17",
        finished: false
    },
    {
        id: 4,
        player: "user7",
        player2: "user10",
        score1: 0,
        score2: 5,
        date: "2023-09-18",
        finished: true
    }
];
exports.mockdata = [
    {
        id: 1,
        username: "mosdab20",
        password: "20",
        age: 19,
        name: "David Mosi",
        role: "admin",
        matches: [exports.mockMatches[0], exports.mockMatches[2]]
    },
    {
        id: 2,
        username: "bogbeb19",
        password: "19",
        age: 24,
        name: "Benjamin Bogdan",
        role: "spieler",
        matches: [exports.mockMatches[0]]
    },
    {
        id: 3,
        username: "jakleb20",
        password: "20",
        age: 22,
        name: "Leon Edlinger",
        role: "halbadmin",
        matches: [exports.mockMatches[1]]
    }
];
// Mock Tournaments
exports.mockTournaments = [
    {
        id: 1,
        name: "Champion's League",
        description: "Annual championship tournament",
        users: [exports.mockdata[1], exports.mockdata[0]],
        matches: [exports.mockMatches[0], exports.mockMatches[1]],
        prize: 10000
    },
    {
        id: 2,
        name: "Beginner's Cup",
        description: "Tournament for beginners",
        users: [exports.mockdata[0], exports.mockdata[1]],
        matches: [exports.mockMatches[2], exports.mockMatches[3]],
        prize: 5000
    }
];
// Mock Users
// Assign users to tournaments
exports.mockTournaments[0].users = [exports.mockdata[0], exports.mockdata[1]];
exports.mockTournaments[1].users = [exports.mockdata[6], exports.mockdata[8], exports.mockdata[9]];
