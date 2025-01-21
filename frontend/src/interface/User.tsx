import {Match} from "./Match.ts";
import {Tournament} from "./Tournament.ts";

export interface User {
    id: number;
    username: string,
    password: string,
    age: number,
    name: string,
    role: string;
    tournaments: Tournament[];
    matches: Match[];
}