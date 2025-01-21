import "./HomePage.css";
import { useState, useEffect } from "react";
import { useTennisContext } from "../../context/context.tsx";
import { TournamentService } from "../../Service/TournamentService.ts";
import { Tournament } from "../../interface/Tournament.ts";

const HomePage = () => {
    const { selectedTournament, setSelectedTournament } = useTennisContext();
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all tournaments on component mount
    useEffect(() => {
        const fetchTournaments = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedTournaments = await TournamentService.getTournaments();
                setTournaments(fetchedTournaments);
            } catch (err: any) {
                setError("Failed to fetch tournaments");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTournaments();
    }, []);

    return (
        <div id="homepage">
            <h1>Tournaments</h1>

            {/* Show loading spinner */}
            {loading && <p id="loading">Loading...</p>}

            {/* Show error message */}
            {error && <p id="error">{error}</p>}

            {/* Tournament selection dropdown */}
            <select
                id="tournament-select"
                value={selectedTournament?._id || ""}
                onChange={(e) => {
                    const selectedId = e.target.value;
                    const selected = tournaments.find(t => t._id === selectedId);
                    setSelectedTournament(selected || null);
                }}
            >
                <option value="">Select a tournament</option>
                {tournaments.map((tournament) => (
                    <option key={tournament._id} value={tournament._id}>
                        {tournament.name}
                    </option>
                ))}
            </select>

            {/* Display matches for the selected tournament */}
            {selectedTournament && (
                <div id="matches-section">
                    <h2>Matches for {selectedTournament.name}</h2>
                    <p>{selectedTournament.description}</p>
                    {selectedTournament.matches.length > 0 ? (
                        <ul>
                            {selectedTournament.matches.map((match) => (
                                <li key={match._id}>
                                    <strong>
                                        {match.player.firstname} {match.player.lastname} ({match.player.country}) vs. {match.player2.firstname} {match.player2.lastname} ({match.player2.country})
                                    </strong>
                                    <p>
                                        Location: {match.location} <br />
                                        Date: {new Date(match.date).toLocaleDateString()} <br />
                                        Duration: {match.durationMinutes} minutes <br />
                                        Score: {" "}
                                        {match.score
                                            .map(
                                                (set: number[]) =>
                                                    `${set[0]}-${set[1]}`
                                            )
                                            .join(", ")}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No matches available for this tournament.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default HomePage;
