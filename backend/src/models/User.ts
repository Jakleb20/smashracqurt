import {Tournament} from "./Tournament";
import {Match} from "./Match";


export interface User {
    username: string,
    password: string,
    age: number,
    name: string,
    role: string;
    tournaments: Tournament[];
    matches: Match[];
}