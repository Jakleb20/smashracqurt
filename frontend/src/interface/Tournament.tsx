import {User} from "./User.ts";
import {Match} from "./Match.ts";

export interface Tournament {
    id: number,
    name: string,
    description: string,
    users: User[],
    matches: Match[],
    prize: number
}