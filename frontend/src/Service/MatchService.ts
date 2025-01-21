import axios from "axios";
import { Match } from "../interface/Match.tsx";

export class MatchService {
    private static readonly BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

    public static async getMatches(): Promise<Match[]> {
        const response = await axios.get<Match[]>(this.BASE_URL+"/matches");
        console.log(response);
        return response.data;
    }

    public static async getMatchesByTournamentId(tournamentId: string): Promise<Match[]> {
        try {
            const response = await axios.get(`${this.BASE_URL}/matches`, {
                params: { tournament: tournamentId }, // Filter nach Turnier-ID
            });
            return response.data;
        } catch (error) {
            console.error("Fehler beim Abrufen der Matches:", error);
            throw error;
        }
    }
}
