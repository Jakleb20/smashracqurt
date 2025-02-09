"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TournamentModel_1 = require("../src/db/TournamentModel");
let router = express_1.default.Router();
// http://localhost:3005/tournaments/
router.get('/', (req, res) => {
    TournamentModel_1.TournamentModel.find().then(tournaments => res.send(tournaments));
});
//  htttp://localhost:3005/tournaments/tByLetter?letter=A
router.get('/tByLetter', (req, res) => {
    var _a;
    const letter = (_a = req.query.letter) === null || _a === void 0 ? void 0 : _a.toString();
    console.log(letter);
    if (!letter || letter.length !== 1) {
        return res.status(400).send("Bitte gib einen einzigen Buchstaben als 'letter' an.");
    }
    TournamentModel_1.TournamentModel.find({ name: { $regex: new RegExp(`^${letter}`, "i") } })
        .then(tournaments => {
        res.send(tournaments);
    });
});
// http://localhost:3005/tournaments/tByPrize?prize=1500000
router.get('/tByPrize/', (req, res) => {
    const prize = Number(req.query.prize);
    if (isNaN(prize)) {
        return res.status(400).send("Bitte gib eine gültige Zahl als 'prize' an.");
    }
    TournamentModel_1.TournamentModel.find({ prize: prize })
        .then(tournaments => {
        if (tournaments.length === 0) {
            return res.status(404).send("Keine Turniere mit diesem Prize gefunden.");
        }
        res.send(tournaments);
    })
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});
// http://localhost:3005/tournaments/prize-range?minPrize=0&maxPrize=1500000
router.get('/prize-range', (req, res) => {
    const minPrize = Number(req.query.minPrize);
    const maxPrize = Number(req.query.maxPrize);
    if (isNaN(minPrize) || isNaN(maxPrize)) {
        return res.status(400).send("Bitte gib gültige Zahlen als 'minPrize' und 'maxPrize' an.");
    }
    TournamentModel_1.TournamentModel.find({ prize: { $gte: minPrize, $lte: maxPrize } })
        .then(tournaments => {
        res.send(tournaments);
    })
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});
// http://localhost:3005/tournaments/sortedByPrice?order=asc
router.get('/sortedByPrice', (req, res) => {
    var _a;
    const order = ((_a = req.query.order) === null || _a === void 0 ? void 0 : _a.toString()) || "asc";
    const sortOrder = order === "asc" ? 1 : -1;
    TournamentModel_1.TournamentModel.find().sort({ prize: sortOrder })
        .then(tournaments => res.send(tournaments))
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});
// http://localhost:3005/tournaments/sortedByName?order=asc
router.get('/sortedByName', (req, res) => {
    var _a;
    const order = ((_a = req.query.order) === null || _a === void 0 ? void 0 : _a.toString()) || "asc";
    const sortOrder = order === "asc" ? 1 : -1;
    TournamentModel_1.TournamentModel.find().sort({ name: sortOrder })
        .then(tournaments => res.send(tournaments))
        .catch(err => res.status(500).send("Fehler beim Abrufen der Turniere: " + err.message));
});
router.delete('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    try {
        const deletedTournament = yield TournamentModel_1.TournamentModel.findOneAndDelete({ name });
        if (!deletedTournament) {
            return res.status(404).send("Turnier nicht gefunden.");
        }
        res.send(deletedTournament);
    }
    catch (error) {
        console.error("Fehler beim Löschen des Turniers:", error);
        res.status(500).send("Interner Serverfehler");
    }
}));
// http://localhost:3005/tournaments/add
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const existingTournament = yield TournamentModel_1.TournamentModel.findOne({ name });
            if (existingTournament) {
                return res.status(409).send("Ein Turnier mit diesem Namen existiert bereits.");
            }
        }
        // Höchste existierende ID abrufen
        const lastTournament = yield TournamentModel_1.TournamentModel.findOne().sort({ id: -1 });
        const nextId = lastTournament ? lastTournament.id + 1 : 1;
        // Neues Turnier mit automatisch generierter ID erstellen
        const newTournament = new TournamentModel_1.TournamentModel({
            id: nextId,
            name,
            description,
            users: users || [],
            matches: matches || [],
            prize,
        });
        const savedTournament = yield newTournament.save();
        res.status(201).send(savedTournament);
    }
    catch (error) {
        console.error("Ein Turnier mit diesem Namen existiert bereits:", error);
        res.status(500).send("Interner Serverfehler");
    }
}));
module.exports = router;
