"use strict";
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
router.post('/', (req, res) => {
    const tournament = req.body;
    TournamentModel_1.TournamentModel.create(tournament)
        .then(r => res.status(200).send(r))
        .catch(e => res.status(400));
});
module.exports = router;
