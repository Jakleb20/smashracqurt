import {User} from "./User.tsx";
import {Match} from "./Match.tsx";

export interface Tournament {
    name: string,
    description: string,
    users: User[],
    matches: Match[],
    prize: number
}