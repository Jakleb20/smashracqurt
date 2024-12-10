import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage">
            <main className="content">
                <section className="live-score">
                    <div className="text-container">
                        <h2>Live</h2>
                        <h3>Klasse 1 vs. Klasse 2</h3>
                        <div className="score">3:1</div>
                    </div>
                </section>

                <section className="next-matches">
                    <h2>Nächste Spiele</h2>
                    <div className="matches-grid">
                        <div className="match-card">
                            <time>10:30</time>
                            <p>Klasse 3 vs. Klasse 4</p>
                            <span>Gruppe A</span>
                        </div>
                        <div className="match-card">
                            <time>10:45</time>
                            <p>Klasse 1 vs. Klasse 4</p>
                            <span>Gruppe B</span>
                        </div>
                        <div className="match-card">
                            <time>12:00</time>
                            <p>Klasse 5 vs. offen</p>
                            <span>Achtelfinale</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;