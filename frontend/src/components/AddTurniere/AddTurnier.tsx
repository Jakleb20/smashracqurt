import {useState} from 'react';
import {Tournament} from "../../interface/Tournament.tsx";
import './AddTurnier.css';

const AddTurnier = () => {

    const [turniere, setTurniere] = useState<Tournament[]>([]);
    const [tournamentName, setTournamentName] = useState('');
    const [tournamentDescription, setTournamentDescription] = useState('');
    const [tournamentPrize, setTournamentPrize] = useState<number>(0);


    const addTournament = () => {
        const newTournament: Tournament = {
            name: tournamentName,
            description: tournamentDescription,
            users: [],
            matches: [],
            prize: tournamentPrize,
        };

        setTurniere([...turniere, newTournament]);
        setTournamentName('');
        setTournamentDescription('');
        setTournamentPrize(0);
    };
    return (
        <div id="ma">
            <h1 id="tournament-title">Turniere erstellen</h1>

            <form className="tournament-form">
                <div className="form-group">
                    <label htmlFor="tournament-name-input">Turniername</label>
                    <input
                        type="text"
                        id="tournament-name-input"
                        placeholder="Turniername"
                        value={tournamentName}
                        onChange={(e) => setTournamentName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tournament-description-input">Beschreibung</label>
                    <input
                        type="text"
                        id="tournament-description-input"
                        placeholder="Beschreibung"
                        value={tournamentDescription}
                        onChange={(e) => setTournamentDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tournament-prize-input">Preisgeld</label>
                    <input
                        type="number"
                        id="tournament-prize-input"
                        placeholder="Preisgeld"
                        value={tournamentPrize}
                        onChange={(e) => setTournamentPrize(Number(e.target.value))}
                    />
                </div>
                <button type="button" id="add-tournament-button" onClick={addTournament}>
                    Turnier hinzufügen
                </button>
            </form>
        </div>
    );
};

export default AddTurnier;