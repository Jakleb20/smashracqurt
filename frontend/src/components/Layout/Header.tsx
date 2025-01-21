import { useNavigate } from "react-router-dom";
import { useTennisContext } from "../../context/context.tsx";
import "./Header.css"

const Header = () => {
    const navigate = useNavigate();
    const TennisContext = useTennisContext(); // Verwende den TennisContext für Authentifizierungsstatus

    const handleLogout = () => {
        // Setze den Authentifizierungsstatus auf false (Logout)
        TennisContext.setIsAuthenticated(false);
        // Navigiere zur Login-Seite
        navigate("");
    };

    return (
        <div>
            <nav className="navbar">
                <div className="left-section">
                    <h1>Paulus ist cool</h1>
                    <br/>
                </div>
                <div className="center-section">
                    <a style={{userSelect: "none"}} onClick={() => navigate("/HomePage")}
                       className="nav-link">Startseite</a>
                    <a style={{userSelect: "none"}} onClick={() => navigate("/Tournaments")} className="nav-link">Alle
                        Turniere</a>
                    <a style={{userSelect: "none"}} onClick={() => navigate("/AddTournament")} className="nav-link">Turnier hinzufügen</a>
                </div>
                <div className="right-section">
                    <button id={"logout"} onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </nav>

            {/* Rest of your homepage content */}
        </div>
    );
};

export default Header;
