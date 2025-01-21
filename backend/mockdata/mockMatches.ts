import { Match } from "../src/models/Match";
import { Player } from "../src/models/Player";

export const mockMatches: Match[] = [
    {
        player: {  firstname: "Roger", lastname: "Federer", country: "Switzerland" },
        player2: {  firstname: "Rafael", lastname: "Nadal", country: "Spain" },
        score: [[6, 4], [3, 6], [7, 5]],
        date: "2025-01-10",
        location: "Melbourne, Australia",
        durationMinutes: 125,
        finished: true
    },
    {

        player: { firstname: "Domenic", lastname: "Thiem", country: "Austria" },
        player2: {  firstname: "Andy", lastname: "Murray", country: "UK" },
        score: [[6, 3], [6, 2]],
        date: "2025-02-15",
        location: "London, UK",
        durationMinutes: 90,
        finished: true
    },
    {

        player: {  firstname: "Roger", lastname: "Federer", country: "Switzerland" },
        player2: {  firstname: "Domenic", lastname: "Thiem", country: "Austria" },
        score: [[7, 6], [6, 4]],
        date: "2025-03-20",
        location: "Indian Wells, USA",
        durationMinutes: 110,
        finished: true
    }
];
