import {User} from "./User.ts";
import {Match} from "./Match.ts";

export interface Tournament {
    description: string,
    id: number,
    matches: Match[],
    name: string,
    prize: number,
    users: User[]
}