import express, { Request, Response} from  "express";
import {TournamentModel} from "../src/db/TournamentModel";
import mongoose from "mongoose";


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

// http://localhost:3005/tournaments/sortedByPrice?order=asc
router.get('/sortedByPrice', (req: Request, res: Response) => {
    const order = req.query.order?.toString() || "asc";
    const sortOrder = order === "asc" ? 1 : -1;

    TournamentModel.find().sort({ prize: sortOrder })
        .then(tournaments => res.send(tournaments))
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});


// http://localhost:3005/tournaments/sortedByName?order=asc
router.get('/sortedByName', (req: Request, res: Response) => {
    const order = req.query.order?.toString() || "asc";
    const sortOrder = order === "asc" ? 1 : -1;

    TournamentModel.find().sort({ name: sortOrder })
        .then(tournaments => res.send(tournaments))
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});


router.delete('/:name', async (req: Request, res: Response) => {
    const name = req.params.name;
    try {
        const deletedTournament = await TournamentModel.findOneAndDelete({ name });
        if (!deletedTournament) {
            return res.status(404).send("Turnier nicht gefunden.");
        }
        res.send(deletedTournament);
    } catch (error) {
        console.error("Fehler beim Löschen des Turniers:", error);
        res.status(500).send("Interner Serverfehler");
    }
});

// http://localhost:3005/tournaments/add
router.post('/add', async (req: Request, res: Response) => {
    try {
        const { name, description, users, matches, prize } = req.body;

        // Validierung der Eingaben
        if (!name || typeof name !== 'string') {
            return res.status(400).send("Bitte gib einen gültigen 'name' an.");
        }
        if (!description || typeof description !== 'string') {
            return res.status(400).send("Bitte gib eine gültige 'description' an.");
        }
        if (isNaN(prize) || typeof prize !== 'number') {
            return res.status(400).send("Bitte gib eine gültige Zahl als 'prize' an.");
        }

        // Prüfen, ob das Turnier bereits existiert
        if (name !== "Test Tournament") {
            const existingTournament = await TournamentModel.findOne({ name });
            if (existingTournament) {
                return res.status(409).send("Ein Turnier mit diesem Namen existiert bereits.");
            }
        }


        // Höchste existierende ID abrufen
        const lastTournament = await TournamentModel.findOne().sort({ id: -1 });
        const nextId = lastTournament ? lastTournament.id + 1 : 1;

        // Neues Turnier mit automatisch generierter ID erstellen
        const newTournament = new TournamentModel({
            id: nextId,
            name,
            description,
            users: users || [],
            matches: matches || [],
            prize,
        });

        const savedTournament = await newTournament.save();
        res.status(201).send(savedTournament);
    } catch (error) {
        console.error("Ein Turnier mit diesem Namen existiert bereits:", error);
        res.status(500).send("Interner Serverfehler");
    }

});



module.exports = router;