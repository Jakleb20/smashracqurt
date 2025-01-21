import axios from "axios";
import {User} from "../interface/User.ts";

export class UserService {

    private static readonly BASE_URL: string = import.meta.env.VITE_BACKEND_URL;

    public static async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(this.BASE_URL+"/users");
        console.log(response);
        return response.data;
    }
}