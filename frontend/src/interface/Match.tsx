import {Player} from "./Player.ts";
import {Tournament} from "./Tournament.ts";

export interface Match {
    id: number,
    tournament: Tournament,
    player: Player,
    player2: Player,
    score: [number, number][],
    date: string,
    location:boolean,
    durationMinutes: number,
    finished: boolean
}