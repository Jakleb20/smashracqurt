import {Tournament} from "./Tournament";
import {Player} from "./Player";


export interface Match {
    player: Player,
    player2: Player,
    score: [number, number][],
    date: string,
    location:string,
    durationMinutes: number,
    finished: boolean
}