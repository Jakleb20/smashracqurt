import { Tournament } from "../src/models/Tournament";
import { Player } from "../src/models/Player";
import { Match } from "../src/models/Match";
import { User } from "../src/models/User";

export const mockTournaments: Tournament[] = [
    {
        name: "Australian Open",
        description: "Grand Slam tournament held every January in Melbourne, Australia.",
        prize: 1400000,
        users: [
            {
                username: "mosdab20",
                password: "20",
                age: 19,
                name: "David Mosi",
                role: "admin",
                tournaments: [],
                matches: []
            },
            {
                username: "jakleb20",
                password: "20",
                age: 22,
                name: "Leon Edlinger",
                role: "halbadmin",
                tournaments: [],
                matches: []
            }
        ],
        matches: [
            {
                player: {  firstname: "Roger", lastname: "Federer", country: "Switzerland" },
                player2: {  firstname: "Rafael", lastname: "Nadal", country: "Spain" },
                score: [[6, 4], [3, 6], [7, 5]],
                date: "2025-01-10",
                location: "Melbourne, Australia",
                durationMinutes: 125,
                finished: true
            }
        ]
    },
    {
        name: "Beginner's Cup",
        description: "Tournament for beginners",
        prize: 5000,
        users: [
            {
                username: "bogbeb19",
                password: "19",
                age: 24,
                name: "Benjamin Bogdan",
                role: "spieler",
                tournaments: [],
                matches: []
            },
            {
                username: "makac30",
                password: "30",
                age: 30,
                name: "Karl Mader",
                role: "spieler",
                tournaments: [],
                matches: []
            }
        ],
        matches: [
            {
                player: { firstname: "Domenic", lastname: "Thiem", country: "Austria" },
                player2: { firstname: "Andy", lastname: "Murray", country: "UK" },
                score: [[6, 3], [6, 2]],
                date: "2025-02-15",
                location: "London, UK",
                durationMinutes: 90,
                finished: true
            }
        ]
    },
    {
        name: "Indian Wells Masters",
        description: "A prestigious tournament held in Indian Wells, USA.",
        prize: 1000000,
        users: [
            {
                username: "user9",
                password: "9",
                age: 19,
                name: "User 9",
                role: "spieler",
                tournaments: [],
                matches: []
            }
        ],
        matches: [
            {
                player: {  firstname: "Roger", lastname: "Federer", country: "Switzerland" },
                player2: {  firstname: "Domenic", lastname: "Thiem", country: "Austria" },
                score: [[7, 6], [6, 4]],
                date: "2025-03-20",
                location: "Indian Wells, USA",
                durationMinutes: 110,
                finished: true
            }
        ]
    }
];
