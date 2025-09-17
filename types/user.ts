import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { PortfolioData } from "./portfolioData";

export interface User {
    id: string;
    username: string;
    initials: string; // TODO: change to url for profile pic

    //game stats
    xp: number;
    cash: number;
    streak: number;

    // progress
    level: number;
    lessonsCompleted: number;

    // portfolio data
    portfolio: PortfolioData;

    // leaderboard data
    avatar: string;
    rank: number;
    change: string;
    badges: string[];
    titles: string[];
}