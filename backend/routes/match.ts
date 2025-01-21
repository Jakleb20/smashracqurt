import express, {Request, Response} from "express";
import {MatchModel} from "../src/db/Matchmodel";



let router = express.Router();

router.get('/', (req: Request, res:Response)=> {
    MatchModel.find().then(matches => res.send(matches));
});

module .exports = router;