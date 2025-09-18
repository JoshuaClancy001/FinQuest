import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import { User } from "../types/user";
import { PortfolioData } from "../types/portfolioData";

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    updateUser: (updates: Partial<User>) => void;
    resetUser: () => void;
    updateCoinsAndXp: (xpAdd: number, coinAdd: number) => void;
    updateCurrentLesson: (category: string, lessonNumber: number) => void;
}

// Create a default user with PortfolioData instance matching the current hardcoded data
const createDefaultUser = (): User => ({
    id: "default-user",
    username: "Player",
    initials: "PL",
    xp: 1250,
    cash: 2500,
    streak: 12,
    level: 3,
    lessonsCompleted: 5,
    currentLessons: {},
    portfolio: new PortfolioData(5200, 3750, 3600, 2000, 1200), // Use the original portfolio values
    avatar: "👤",
    rank: 1,
    change: "+2",
    badges: ["📈", "🎯"],
    titles: ["Novice Investor"]
});

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider =({children}:{children: ReactNode}) => {
    const [user, setUserState] = useState<User |null>(createDefaultUser());

    const setUser = useCallback((newUser: User) => {
        setUserState(newUser);
    }, []);

    const updateUser = useCallback((updates: Partial<User>) => {
        setUserState((prev) =>
            prev ? {...prev, ...updates}: (prev as User | null));
    }, []);

    const resetUser = useCallback(() =>{
        setUserState(null);
    }, []);

    const updateCoinsAndXp = useCallback((xp: number, coins: number) => {
        setUserState((prev) =>
            prev ? {
                ...prev, 
                xp: prev.xp + xp,
                cash: prev.cash + coins
            } : prev
        );
    }, []);

    const updateCurrentLesson = useCallback((category: string, lessonNumber: number) => {
        setUserState((prev) => {
            if (!prev) return prev;
            const updatedLessons = { ...prev.currentLessons, [category]: lessonNumber };
            return { ...prev, currentLessons: updatedLessons };
        });
    }, []);

    const contextValue = useMemo(() => ({
        user,
        setUser,
        updateUser,
        resetUser,
        updateCoinsAndXp,
        updateCurrentLesson
    }), [user, setUser, updateUser, resetUser, updateCoinsAndXp, updateCurrentLesson]);

    return (
        <UserContext.Provider value={contextValue}>
        {children}
        </UserContext.Provider>
    );
};

    export const useUser = () => {
        const context = useContext(UserContext);
        if (!context){
            throw new Error("Error in useContext")
        }
        return context
    }

