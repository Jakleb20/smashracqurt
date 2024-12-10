import axios from "axios";
import {Match} from "../interface/Match.tsx";

export class MatchService {
    private static readonly BASE_URL:string = "http://95.143.172.216:45920";

    public static async getMatches(): Promise<Match[]> {
        const response = await axios.get<Match[]>(this.BASE_URL+"/matches");
        console.log(response);
        return response.data;
    }
}