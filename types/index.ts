// Navigation types
export type RootTabParamList = {
  Home: undefined;
  Learn: undefined;
  Portfolio: undefined;
  Wallet: undefined;
  Leaderboard: undefined;
};

// Screen props types
export type ScreenProps = {
  navigation: any; // Will be typed more specifically when we need navigation
  route: any; // Will be typed more specifically when we need route params
};

// Common component types
export interface BaseScreenProps {
  title: string;
  subtitle: string;
}

// User and Profile types
export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  coins: number;
  streak: number;
  avatar?: string; // Optional avatar URL
  level?: number;
  xp?: number;
}

// App data types
export interface CoinTransaction {
  id: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  timestamp: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

// Daily Quest types
export interface DailyQuest {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  color: string;
  reward: number;
  type: 'scenario' | 'investment' | 'lesson' | 'budget' | 'savings';
}

// Leaderboard types
export interface LeaderboardData {
  userRank: number;
  totalUsers: number;
  weeklyRank: number;
  friendsAhead: number;
  friendsNames: string[];
  pointsToNext: number;
  weeklyPoints: number;
}

export interface LeaderboardPlayer {
  id: string;
  name: string;
  avatar: string;
  netWorth: number;
  rank: number;
  change: string; // e.g., '+3', '-1', '=', 'NEW'
  level: number;
  xp: number;
  isYou: boolean;
}

export type LeaderboardView = 'global' | 'friends' | 'local';
export type TimeframePeriod = 'daily' | 'weekly' | 'alltime';

export interface LeaderboardViewData {
  [key: string]: {
    [key in TimeframePeriod]: LeaderboardPlayer[];
  };
}

export interface ViewTab {
  id: LeaderboardView;
  title: string;
  icon: string;
  description: string;
}

export interface TimeframeFilter {
  id: TimeframePeriod;
  title: string;
  icon: string;
}

// Gamification types
export interface Badge {
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number; // 0-100
  reward: number;
  timeLeft: string;
  icon: string;
  color: string;
}

export interface DynamicEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  timeLeft: string;
  leaderboard: {
    rank: number;
    name: string;
    avatar: string;
    lossPercentage: number;
    netWorth: number;
  }[];
}

// Social features
export interface FriendChallenge {
  id: string;
  title: string;
  description: string;
  goal: string;
  timeframe: string;
  icon: string;
  reward: string;
}

export interface ShareableRank {
  message: string;
  hashtags: string;
  stats: string;
}

// Learn screen types
export interface UserProgress {
  dailyXP: number;
  dailyXPGoal: number;
  weeklyXP: number;
  weeklyXPGoal: number;
  streak: number;
  longestStreak: number;
  dailyLessonsCompleted: number;
  dailyLessonsGoal: number;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  totalXP: number;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  xpReward: number;
  completed: boolean;
  category: string;
  icon: string;
}

// Curriculum types
export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  unlocked: boolean;
  xp: number;
}

export interface CurriculumUnit {
  id: string;
  title: string;
  icon: string;
  color: string;
  backgroundColor: string;
  borderColor: string;
  lessons: Lesson[];
}
