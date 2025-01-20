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

    // Get tournaments sorted by price (asc or desc)
    public static async getTournamentsSortedByPrice(order: "asc" | "desc"): Promise<Tournament[]> {
        const response = await axios.get<Tournament[]>(`${this.BASE_URL}/tournaments/sortedByPrice`, {
            params: { order }
        });
        console.log(response);
        return response.data;
    }

    // Get tournaments sorted by name (asc or desc)
    public static async getTournamentsSortedByName(order: "asc" | "desc"): Promise<Tournament[]> {
        const response = await axios.get<Tournament[]>(`${this.BASE_URL}/tournaments/sortedByName`, {
            params: { order }
        });
        console.log(response);
        return response.data;
    }

    // Add tournament to the backend
    public static async addTournament(tournament: Omit<Tournament, "id">): Promise<Tournament> {
        const response = await axios.post<Tournament>(
            `${this.BASE_URL}/tournaments/add`,
            tournament
        );
        console.log(response.data);
        return response.data;
    }



}