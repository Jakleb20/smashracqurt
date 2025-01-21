import express, { Request, Response} from  "express";
import {PlayerModel} from "../src/db/PlayerModel";

const router = express.Router();

// Route: Alle Spieler abrufen
router.get("/", async (req, res) => {
    try {
        const players = await PlayerModel.find();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Spieler." });
    }
});

// Route: Einzelnen Spieler nach ID abrufen
router.get("/:id", async (req, res) => {
    try {
        const player = await PlayerModel.findOne({ id: req.params.id });
        if (!player) {
            return res.status(404).json({ error: "Spieler nicht gefunden." });
        }
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen des Spielers." });
    }
});

// Route: Neuen Spieler erstellen
router.post("/", async (req, res) => {
    try {
        const newPlayer = new PlayerModel(req.body);
        await newPlayer.save();
        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Erstellen des Spielers." });
    }
});

// Route: Spieler aktualisieren
router.put("/:id", async (req, res) => {
    try {
        const updatedPlayer = await PlayerModel.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedPlayer) {
            return res.status(404).json({ error: "Spieler nicht gefunden." });
        }
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Aktualisieren des Spielers." });
    }
});

// Route: Spieler löschen
router.delete("/:id", async (req, res) => {
    try {
        const deletedPlayer = await PlayerModel.findOneAndDelete({ id: req.params.id });
        if (!deletedPlayer) {
            return res.status(404).json({ error: "Spieler nicht gefunden." });
        }
        res.status(200).json({ message: "Spieler erfolgreich gelöscht." });
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Löschen des Spielers." });
    }
});

router.post("/batch", async (req, res) => {
    try {
        const { ids } = req.body; // Liste von Spieler-IDs aus dem Request-Body
        if (!ids || !Array.isArray(ids)) {
            return res.status(400).json({ error: "Ungültige Anforderung. IDs müssen ein Array sein." });
        }

        const players = await PlayerModel.find({ id: { $in: ids } }); // Spieler mit den IDs abrufen
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Spielerinformationen." });
    }
});



module.exports = router;