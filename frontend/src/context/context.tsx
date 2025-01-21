import { createContext, useContext, useState, ReactNode } from "react";
import {Tournament} from "../interface/Tournament.ts";

interface TennisContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    selectedTournament: Tournament | null;
    setSelectedTournament: (tournament: Tournament | null) => void;
}

const TennisContext = createContext<TennisContextProps | undefined>(undefined);

export const TennisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

    return (
        <TennisContext.Provider value={{isAuthenticated,
            setIsAuthenticated,
            selectedTournament,
            setSelectedTournament, }}>
            {children}
        </TennisContext.Provider>
    );
};

export const useTennisContext = () => {
    const context = useContext(TennisContext);
    if (!context) {
        throw new Error('useTennisContext must be used within a TennisProvider');
    }
    return context;
};

export default TennisContext;