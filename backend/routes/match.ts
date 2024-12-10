import express, {Request, Response} from "express";
import {UserModel} from "../src/db/UserModel";
import {MatchModel} from "../src/db/Matchmodel";

let router = express.Router();

router.get('/', (req: Request, res:Response)=> {
    MatchModel.find().then(matches => res.send(matches));
});

module .exports = router;