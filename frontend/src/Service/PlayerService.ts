import axios from "axios";
import { Player } from "../interface/Player.ts";

export class PlayerService {
    private static readonly BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

    public static async getPlayerById(playerId: string): Promise<Player> {
        try {
            const response = await axios.get(`${this.BASE_URL}/players/${playerId}`);
            return response.data;
        } catch (error) {
            console.error("Fehler beim Abrufen des Spielers:", error);
            throw error;
        }
    }

    public static async getPlayers(): Promise<Player[]> {
        try {
            const response = await axios.get(`${this.BASE_URL}/players/`);
            return response.data;
        } catch (error) {
            console.error("Fehler beim Abrufen der Spielerinformationen:", error);
            throw error;
        }
    }
}
