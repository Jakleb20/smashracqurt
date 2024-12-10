import express, { Request, Response} from  "express";
import {TournamentModel} from "../src/db/TournamentModel";


let router = express.Router();

// http://localhost:3005/tournaments/
router.get('/', (req: Request, res:Response)=> {

    TournamentModel.find().then(tournaments => res.send(tournaments));
});

//  htttp://localhost:3005/tournaments/tByLetter?letter=A
router.get('/tByLetter', (req: Request, res: Response) => {
    const letter = req.query.letter?.toString();
    console.log(letter);

    if (!letter || letter.length !== 1) {
        return res.status(400).send("Bitte gib einen einzigen Buchstaben als 'letter' an.");
    }

    TournamentModel.find({ name: { $regex: new RegExp(`^${letter}`, "i") } })
        .then(tournaments => {
            res.send(tournaments);})
});

// http://localhost:3005/tournaments/tByPrize?prize=1500000
router.get('/tByPrize/', (req: Request, res: Response) => {
    const prize = Number(req.query.prize);

    if (isNaN(prize)) {
        return res.status(400).send("Bitte gib eine gültige Zahl als 'prize' an.");
    }

    TournamentModel.find({ prize: prize })
        .then(tournaments => {
            if (tournaments.length === 0) {
                return res.status(404).send("Keine Turniere mit diesem Prize gefunden.");
            }
            res.send(tournaments);
        })
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});


// http://localhost:3005/tournaments/prize-range?minPrize=0&maxPrize=1500000
router.get('/prize-range', (req: Request, res: Response) => {
    const minPrize = Number(req.query.minPrize);
    const maxPrize = Number(req.query.maxPrize);


    if (isNaN(minPrize) || isNaN(maxPrize)) {
        return res.status(400).send("Bitte gib gültige Zahlen als 'minPrize' und 'maxPrize' an.");
    }

    TournamentModel.find({ prize: { $gte: minPrize, $lte: maxPrize } })
        .then(tournaments => {
            res.send(tournaments);
        })
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});

router.post('/', (req: Request, res:Response) => {
    const tournament = req.body;
    

    
    TournamentModel.create(tournament)
        .then(r => res.status(200).send(r))
        .catch(e => res.status(400));
})

module.exports = router;