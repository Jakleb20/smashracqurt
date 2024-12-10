import { useEffect, useState } from "react";
import { Tournament } from "../../interface/Tournament";
import { TournamentService } from "../../Service/TournamentService";
import './Turniere.css';

const Turniere = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);

    const [initialLetter, setInitialLetter] = useState<string>('');
    const [minPrize, setMinPrize] = useState<number | string>('');
    const [maxPrize, setMaxPrize] = useState<number | string>('');
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const fetchTournaments = async () => {
        const data = await TournamentService.getTournaments();
        setTournaments(data);
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    // Filter anwenden
    const applyFilters = () => {
        let filteredTournaments = tournaments;

        // Filter nach dem Anfangsbuchstaben anwenden
        if (initialLetter) {
            filteredTournaments = filteredTournaments.filter((tournament) =>
                tournament.name.startsWith(initialLetter.toUpperCase()) // Sicherstellen, dass die Groß-/Kleinschreibung ignoriert wird
            );
        }

        // Filter nach Preis anwenden
        if (minPrize !== '') {
            filteredTournaments = filteredTournaments.filter(
                (tournament) => tournament.prize >= +minPrize
            );
        }

        if (maxPrize !== '') {
            filteredTournaments = filteredTournaments.filter(
                (tournament) => tournament.prize <= +maxPrize
            );
        }

        // Sortierung anwenden
        filteredTournaments = filteredTournaments.sort((a, b) => {
            if (sortBy === "name") {
                return sortOrder === "asc"
                    ? b.name.localeCompare(a.name)  // Aufsteigend alphabetisch
                    : a.name.localeCompare(b.name); // Absteigend alphabetisch
            } else if (sortBy === "prize") {
                return sortOrder === "asc" ? b.prize - a.prize : a.prize - b.prize;
            }
            return 0;
        });

        setTournaments(filteredTournaments);
    };


    useEffect(() => {
        applyFilters();
    }, [initialLetter, minPrize, maxPrize, sortBy, sortOrder]);

    // Filter zurücksetzen
    const resetFilters = () => {
        setInitialLetter('');
        setMinPrize('');
        setMaxPrize('');
        setSortBy('name');
        setSortOrder('asc');
        fetchTournaments(); // Originale Liste der Turniere neu laden
    };

    return (
        <div id="tournament-container">
            <div className="filter-sort-controls">
                <div>
                    <label>Anfangsbuchstabe:</label>
                    <input id="letterFirst"
                        type="text"
                        maxLength={1}
                        value={initialLetter}
                        onChange={(e) => setInitialLetter(e.target.value)}
                    />
                </div>
                <div>
                    <label>Min Preis:</label>
                    <input
                        type="number"
                        value={minPrize}
                        onChange={(e) => setMinPrize(e.target.value)}
                    />
                </div>
                <div>
                    <label>Max Preis:</label>
                    <input
                        type="number"
                        value={maxPrize}
                        onChange={(e) => setMaxPrize(e.target.value)}
                    />
                </div>
                <div>
                    <label>Sortieren nach:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >

                        <option value="name">Name</option>
                        <option value="prize">Preis</option>
                    </select>
                </div>
                <div>
                    <label>Reihenfolge:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >

                        <option value="asc">Aufsteigend</option>
                        <option value="desc">Absteigend</option>
                    </select>
                </div>

                {/* Button zum Zurücksetzen der Filter */}
                <button onClick={resetFilters}>Filter zurücksetzen</button>
            </div>

            <div className="list-tournaments">
                <h2 id="tournament-list-title">Liste der Turniere</h2>
                <ul id="tournament-list">
                    {tournaments.map((tournament) => (
                        <li id="tournament-list-item" >
                            <strong>{tournament.name}</strong>: {tournament.description} Preis: {tournament.prize}€
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Turniere;
