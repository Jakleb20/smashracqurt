import { useEffect, useState } from "react";
import { Tournament } from "../../interface/Tournament.ts";
import { TournamentService } from "../../Service/TournamentService";
import './Turniere.css';


const Turniere = () => {
    const [tournaments, setTournaments] = useState<Tournament[]>([]);
    const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
    const [name, setName] = useState<string>('');
    const [minPrize, setMinPrize] = useState<number | string>();
    const [maxPrize, setMaxPrize] = useState<number | string>();
    const [sortBy, setSortBy] = useState<string>('name');
    const [sortOrder, setSortOrder] = useState<string>('asc');

    const fetchTournaments = async () => {
        const data = await TournamentService.getTournaments();

        setTournaments(data);
        setFilteredTournaments(data);

    };

    useEffect(() => {
         fetchTournaments();
    }, []);

    const applyFilters = () => {
         let help:Tournament[] = [];

        if (minPrize !== '' && minPrize && maxPrize !== '' && maxPrize && name && name !== ''){
            help =  tournaments.filter(tournament =>
                tournament.prize >= +minPrize &&
                tournament.prize <= +maxPrize &&
                tournament.name.toLowerCase().startsWith(name.toLowerCase())
            );
            setFilteredTournaments(help)
        } else if (minPrize !== '' && minPrize && maxPrize !== '' && maxPrize) {
            help = tournaments.filter((tournament) => {
                return tournament.prize <= +maxPrize && tournament.prize >= +minPrize;
            });
            setFilteredTournaments(help);
        } else if(name && name !== '' && maxPrize !== '' && maxPrize){
            help  = tournaments.filter(tournament =>
                tournament.name.toLowerCase().startsWith(name.toLowerCase()) &&
                tournament.prize <= +maxPrize
            );
            setFilteredTournaments(help);
        }else if (minPrize !== '' && minPrize && name && name !== ''){
            help =  tournaments.filter(tournament =>
                tournament.prize >= +minPrize && tournament.name.toLowerCase().startsWith(name.toLowerCase())
            );
            setFilteredTournaments(help);
        }
        else  if (name && name !== '') {

            help = tournaments.filter((tournament) =>
                tournament.name.toLowerCase().startsWith(name.toLowerCase())
            );

            setFilteredTournaments(help);
        }
        else if (minPrize !== '' && minPrize) {

            help = tournaments.filter(
                (tournament) => tournament.prize >= +minPrize
            );
            setFilteredTournaments(help);
        }

        else if (maxPrize !== '' && maxPrize) {

            help = tournaments.filter(
                (tournament) => tournament.prize <= +maxPrize
            )
            setFilteredTournaments(help);
        }


        else {
            setFilteredTournaments(tournaments)
        }
    };

    const applySorting = () => {
        let sortedTournaments = [...filteredTournaments];

        if (sortBy === 'name') {
            sortedTournaments.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();

                if (sortOrder === 'asc') {
                    return nameA.localeCompare(nameB);
                } else {
                    return nameB.localeCompare(nameA);
                }
            });
        } else if (sortBy === 'prize') {
            sortedTournaments.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.prize - b.prize;
                } else {
                    return b.prize - a.prize;
                }
            });
        }

        setFilteredTournaments(sortedTournaments);
    };


    useEffect(() => {
        applyFilters();
    }, [name, minPrize, maxPrize]);

    useEffect(() => {
        applySorting();
    }, [sortOrder, sortBy]);


    const resetFilters = () => {
        setName('');
        setMinPrize('');
        setMaxPrize('');
        setSortBy('name');
        setSortOrder('asc');
        fetchTournaments();
    };

    return (
        <div id="tournament-container">
            <div className="filter-sort-controls">
                <div>
                    <label>Name:</label>
                    <input id="letterFirst"
                        type="text"
                        value={name}
                           onChange={(e) => setName(e.target.value)}
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


                <button onClick={resetFilters}>Filter zurücksetzen</button>
            </div>

            <div className="list-tournaments">
                <h2 id="tournament-list-title">Liste der Turniere</h2>
                <ul id="tournament-list">
                    {filteredTournaments.map((tournament) => (
                        <li id="tournament-list-item"  key={tournament.id}>
                            <strong>{tournament.name}</strong>: {tournament.description} Preis: {tournament.prize}€
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Turniere;
