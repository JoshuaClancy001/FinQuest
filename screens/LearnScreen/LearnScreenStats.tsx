import React from 'react';
import { View, Text } from 'react-native';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';

// User progress data
const userProgress = {
  dailyXP: 240,
  dailyXPGoal: 300,
  weeklyXP: 1150,
  weeklyXPGoal: 2000,
  streak: 7,
  dailyLessonsCompleted: 1,
  dailyLessonsGoal: 2,
  totalXP: 1850,
  level: 3,
  coins: 450,
  totalCoins: 890,
  unlockedBadges: ['first_lesson', 'week_warrior', 'budget_master'],
  nextLevelXP: 2000,
  levelXP: 1500,
};

interface LearnScreenStatsProps {}

const LearnScreenStats: React.FC<LearnScreenStatsProps> = () => {
  const getWeeklyXPPercentage = () => {
    return Math.min((userProgress.weeklyXP / userProgress.weeklyXPGoal) * 100, 100);
  };

  const getRemainingLessons = () => {
    return Math.max(userProgress.dailyLessonsGoal - userProgress.dailyLessonsCompleted, 0);
  };

  return (
    <>
      {/* Streak & Goal Row */}
      <View style={styles.statsRow}>
        {/* Streak Badge */}
        <View style={styles.streakBadge}>
          <View style={styles.streakFlame}>
            <Text style={styles.flameEmoji}>🔥</Text>
          </View>
          <View style={styles.streakContent}>
            <Text style={styles.streakNumber}>{userProgress.streak}</Text>
            <Text style={styles.streakText}>day streak</Text>
          </View>
        </View>

        {/* Weekly Progress Pill */}
        <View style={styles.weeklyPill}>
          <Text style={styles.weeklyLabel}>This Week</Text>
          <View style={styles.weeklyProgressBar}>
            <View style={[styles.weeklyProgressFill, { 
              width: `${getWeeklyXPPercentage()}%` 
            }]} />
          </View>
          <Text style={styles.weeklyText}>
            {userProgress.weeklyXP}/{userProgress.weeklyXPGoal} XP
          </Text>
        </View>
      </View>

      {/* Daily Goal Banner */}
      <View style={styles.goalBanner}>
        <View style={styles.goalIcon}>
          <Text style={styles.goalEmoji}>🎯</Text>
        </View>
        <View style={styles.goalContent}>
          <Text style={styles.goalTitle}>Daily Mission</Text>
          <Text style={styles.goalDescription}>
            {getRemainingLessons() > 0 
              ? `${getRemainingLessons()} lesson${getRemainingLessons() > 1 ? 's' : ''} left to complete today!`
              : "Mission accomplished! You're on fire! 🔥"
            }
          </Text>
        </View>
        {getRemainingLessons() === 0 && (
          <View style={styles.completeBadge}>
            <Text style={styles.completeText}>✓</Text>
          </View>
        )}
      </View>
    </>
  );
};

export default LearnScreenStats;
