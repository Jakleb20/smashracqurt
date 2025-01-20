import {User} from "./User";
import {Match} from "./Match";


export interface Tournament {
    id: number,
    name: string,
    description: string,
    users: User[],
    matches: Match[],
    prize: number
}