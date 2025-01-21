import {User} from "./User";
import {Match} from "./Match";


export interface Tournament {
    name: string,
    description: string,
    users: User[],
    matches: Match[],
    prize: number
}