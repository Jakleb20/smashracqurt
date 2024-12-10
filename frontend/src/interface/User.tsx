import {Match} from "./Match.tsx";
import {Tournament} from "./Tournament.tsx";

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