import { createContext, useContext, useState, ReactNode } from "react";

interface TennisContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const TennisContext = createContext<TennisContextProps | undefined>(undefined);

export const TennisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <TennisContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
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