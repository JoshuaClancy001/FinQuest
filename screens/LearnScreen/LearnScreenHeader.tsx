import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

// User progress data
const userProgress = {
  dailyXP: 240,
  dailyXPGoal: 300,
  weeklyXP: 1150,
  weeklyXPGoal: 2000,
  streak: 7,
  dailyLessonsCompleted: 1,
  dailyLessonsGoal: 3,
  totalXP: 1250,
  level: 5,
  levelXP: 1000,
  nextLevelXP: 1500,
  coins: 420,
  totalCoins: 1230,
  unlockedBadges: ['first_lesson', 'week_warrior', 'budget_master'],
};

// Badge definitions
const badges = {
  first_lesson: {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Completed your first lesson',
    icon: '🎯',
    unlocked: true,
  },
  week_warrior: {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
    unlocked: true,
  },
  budget_master: {
    id: 'budget_master',
    name: 'Budget Master',
    description: 'Completed all budgeting lessons',
    icon: '💰',
    unlocked: true,
  },
  first_1000: {
    id: 'first_1000',
    name: 'First $1,000 Saved',
    description: 'Saved your first $1,000',
    icon: '💎',
    unlocked: false,
  },
  debt_boss: {
    id: 'debt_boss',
    name: 'Beat Debt Boss',
    description: 'Paid off your debt completely',
    icon: '⚔️',
    unlocked: false,
  },
  investment_rookie: {
    id: 'investment_rookie',
    name: 'Investment Rookie',
    description: 'Made your first investment',
    icon: '📈',
    unlocked: false,
  },
};

interface LearnScreenHeaderProps {}

const LearnScreenHeader: React.FC<LearnScreenHeaderProps> = () => {
  const getDailyXPPercentage = () => {
    return Math.min((userProgress.dailyXP / userProgress.dailyXPGoal) * 100, 100);
  };

  const getWeeklyXPPercentage = () => {
    return Math.min((userProgress.weeklyXP / userProgress.weeklyXPGoal) * 100, 100);
  };

  const getLevelProgress = () => {
    const currentLevelXP = userProgress.totalXP - userProgress.levelXP;
    const nextLevelXP = userProgress.nextLevelXP - userProgress.levelXP;
    return Math.min((currentLevelXP / nextLevelXP) * 100, 100);
  };

  const getUnlockedBadges = () => {
    return Object.values(badges).filter(badge => badge.unlocked);
  };

  return (
    <View style={styles.heroContainer}>
      <View style={styles.heroContent}>
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.welcomeText}>Ready to learn?</Text>
            <Text style={styles.motivationText}>Level up your financial game 🚀</Text>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level {userProgress.level}</Text>
            </View>
            <View style={styles.coinContainer}>
              <Text style={styles.coinIcon}>🪙</Text>
              <Text style={styles.coinText}>{userProgress.coins}</Text>
            </View>
          </View>
        </View>

        {/* XP Progress Circle */}
        <View style={styles.circularProgressContainer}>
          <View style={styles.circularProgress}>
            <View style={[styles.circularProgressFill, { 
              transform: [{ rotate: `${(getDailyXPPercentage() / 100) * 360}deg` }] 
            }]} />
            <View style={styles.circularProgressInner}>
              <Text style={styles.xpNumber}>{userProgress.dailyXP}</Text>
              <Text style={styles.xpLabel}>XP Today</Text>
              <Text style={styles.xpGoal}>Goal: {userProgress.dailyXPGoal}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LearnScreenHeader;
