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
const PlayerModel_1 = require("../src/db/PlayerModel");
const router = express_1.default.Router();
// Route: Alle Spieler abrufen
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const players = yield PlayerModel_1.PlayerModel.find();
        res.status(200).json(players);
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Spieler." });
    }
}));
// Route: Einzelnen Spieler nach ID abrufen
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const player = yield PlayerModel_1.PlayerModel.findOne({ id: req.params.id });
        if (!player) {
            return res.status(404).json({ error: "Spieler nicht gefunden." });
        }
        res.status(200).json(player);
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen des Spielers." });
    }
}));
// Route: Neuen Spieler erstellen
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPlayer = new PlayerModel_1.PlayerModel(req.body);
        yield newPlayer.save();
        res.status(201).json(newPlayer);
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Erstellen des Spielers." });
    }
}));
// Route: Spieler aktualisieren
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPlayer = yield PlayerModel_1.PlayerModel.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedPlayer) {
            return res.status(404).json({ error: "Spieler nicht gefunden." });
        }
        res.status(200).json(updatedPlayer);
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Aktualisieren des Spielers." });
    }
}));
// Route: Spieler löschen
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPlayer = yield PlayerModel_1.PlayerModel.findOneAndDelete({ id: req.params.id });
        if (!deletedPlayer) {
            return res.status(404).json({ error: "Spieler nicht gefunden." });
        }
        res.status(200).json({ message: "Spieler erfolgreich gelöscht." });
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Löschen des Spielers." });
    }
}));
router.post("/batch", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body; // Liste von Spieler-IDs aus dem Request-Body
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ error: "Ungültige Anforderung. IDs müssen ein Array sein." });
        }
        const players = yield PlayerModel_1.PlayerModel.find({ id: { $in: ids } }); // Spieler mit den IDs abrufen
        res.status(200).json(players);
    }
    catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Spielerinformationen." });
    }
}));
module.exports = router;
