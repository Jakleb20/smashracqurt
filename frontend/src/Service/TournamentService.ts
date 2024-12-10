import axios from "axios";
import {Tournament} from "../interface/Tournament.tsx";

export class TournamentService {
    private static readonly BASE_URL:string = "http://localhost:3005";


    public static async getTournaments(): Promise<Tournament[]> {
        const response = await axios.get<Tournament[]>(this.BASE_URL+"/tournaments");
        console.log(response);
        return response.data;
    }


    // Get tournaments by starting letter
    public static async getTournamentsByLetter(letter: string): Promise<Tournament[]> {
        const response = await axios.get<Tournament[]>(`${this.BASE_URL}/tournaments/tByLetter`, {
            params: { letter }
        });
        console.log(response);
        return response.data;
    }

    // Get tournaments by prize
    public static async getTournamentsByPrize(prize: number): Promise<Tournament[]> {
        const response = await axios.get<Tournament[]>(`${this.BASE_URL}/tournaments/tByPrize`, {
            params: { prize }
        });
        console.log(response);
        return response.data;
    }

    // Get tournaments within a prize range
    public static async getTournamentsByPrizeRange(minPrize: number, maxPrize: number): Promise<Tournament[]> {
        const response = await axios.get<Tournament[]>(`${this.BASE_URL}/tournaments/prize-range`, {
            params: { minPrize, maxPrize }
        });
        console.log(response);
        return response.data;
    }


}