"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockTournaments = exports.mockUsers = exports.mockMatches = void 0;
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
// Mock Users
exports.mockUsers = [
    {
        id: 1,
        username: "mosdab20",
        password: "20",
        age: 19,
        name: "David Mosi",
        role: "admin",
        tournaments: [],
        matches: []
    },
    {
        id: 2,
        username: "bogbeb19",
        password: "19",
        age: 24,
        name: "Benjamin Bogdan",
        role: "spieler",
        tournaments: [],
        matches: []
    },
    {
        id: 3,
        username: "jakleb20",
        password: "20",
        age: 22,
        name: "Leon Edlinger",
        role: "halbadmin",
        tournaments: [],
        matches: []
    },
    {
        id: 4,
        username: "makac30",
        password: "30",
        age: 30,
        name: "Karl Mader",
        role: "spieler",
        tournaments: [],
        matches: []
    },
    {
        id: 5,
        username: "user9",
        password: "9",
        age: 19,
        name: "User 9",
        role: "spieler",
        tournaments: [],
        matches: []
    },
    {
        id: 6,
        username: "user7",
        password: "7",
        age: 19,
        name: "User 7",
        role: "spieler",
        tournaments: [],
        matches: []
    },
    {
        id: 7,
        username: "user10",
        password: "10",
        age: 19,
        name: "User 10",
        role: "spieler",
        tournaments: [],
        matches: []
    },
    {
        id: 8,
        username: "user11",
        password: "11",
        age: 19,
        name: "User 11",
        role: "spieler",
        tournaments: [],
        matches: []
    },
    {
        id: 9,
        username: "user12",
        password: "12",
        age: 19,
        name: "User 12",
        role: "spieler",
        tournaments: [],
        matches: []
    },
    {
        id: 10,
        username: "user13",
        password: "13",
        age: 19,
        name: "User 13",
        role: "spieler",
        tournaments: [],
        matches: []
    }
];
// Mock Tournaments
exports.mockTournaments = [
    {
        name: "Champion's League",
        description: "Annual championship tournament",
        users: [],
        matches: [],
        prize: 10000
    },
    {
        name: "Beginner's Cup",
        description: "Tournament for beginners",
        users: [],
        matches: [],
        prize: 5000
    },
    {
        name: "Wimbledon",
        description: "The oldest and most prestigious tennis tournament held in London.",
        users: [],
        matches: [],
        prize: 2000000
    },
    {
        name: "US Open",
        description: "Annual hard-court Grand Slam tournament held in New York.",
        users: [],
        matches: [],
        prize: 1500000
    },
    {
        name: "Australian Open",
        description: "Grand Slam tournament held every January in Melbourne, Australia.",
        users: [],
        matches: [],
        prize: 1400000
    },
    {
        name: "French Open",
        description: "The only Grand Slam played on clay courts, held in Paris.",
        users: [],
        matches: [],
        prize: 1600000
    },
    {
        name: "Davis Cup",
        description: "International team event in men's tennis.",
        users: [],
        matches: [],
        prize: 800000
    },
    {
        name: "Laver Cup",
        description: "Team competition between Team Europe and Team World.",
        users: [],
        matches: [],
        prize: 750000
    },
    {
        name: "ATP Finals",
        description: "Year-end tournament for the top-ranked men's singles and doubles players.",
        users: [],
        matches: [],
        prize: 1300000
    },
    {
        name: "BNP Paribas Open",
        description: "Popular tournament held annually in Indian Wells, California.",
        users: [],
        matches: [],
        prize: 1000000
    },
    {
        name: "Shanghai Masters",
        description: "Premier ATP tournament held in Shanghai, China.",
        users: [],
        matches: [],
        prize: 900000
    },
    {
        name: "Canadian Open",
        description: "Oldest tennis tournament in North America, held in Toronto and Montreal.",
        users: [],
        matches: [],
        prize: 850000
    }
];
