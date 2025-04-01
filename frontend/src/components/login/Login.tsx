import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login/Login.css';
import logoImage from '../../assets/HTL.png'; // Logo importieren

interface LoginProps {
    onLogin: () => void; // Prop für die Login-Funktion
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === 'root' && password === 'Leon') {
            onLogin(); // Erfolgreiche Anmeldung
            navigate('/HomePage'); // Navigiere zur Startseite
        } else {
            alert('Ungültiger Benutzername oder Passwort');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img
                    src={logoImage}
                    alt="Logo"
                    className="login-logo"
                />
                <h1 className="hello">
                    Supervisord schmiert ab ! {/* Hallo Sportsfreund:In! */}
                </h1>                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Benutzername"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button id={"submit"} type="submit" className="login-button">
                        LOS GEHT'S!
                    </button>
                </form>
                <a href="#" className="forgot-password">
                    Passwort vergessen
                </a>
            </div>
        </div>
    );
};

export default Login;
