import axios from "axios";
import {User} from "../interface/User.tsx";

export class UserService {

    private static readonly BASE_URL: string = 'http://localhost:3005';

    public static async getUsers(): Promise<User[]> {
        const response = await axios.get<User[]>(this.BASE_URL+"/users");
        console.log(response);
        return response.data;
    }
}