import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';

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

interface LearnScreenBadgesProps {}

const LearnScreenBadges: React.FC<LearnScreenBadgesProps> = () => {
  const getUnlockedBadges = () => {
    return Object.values(badges).filter(badge => badge.unlocked);
  };

  return (
    <View style={styles.badgesSection}>
      <View style={styles.badgesSectionHeader}>
        <Text style={styles.badgesTitle}>Your Achievements</Text>
        <TouchableOpacity style={styles.viewAllBadges}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.badgesList}
        contentContainerStyle={styles.badgesContent}
      >
        {getUnlockedBadges().slice(0, 5).map((badge) => (
          <View key={badge.id} style={styles.badgeCard}>
            <View style={styles.badgeIconContainer}>
              <Text style={styles.badgeIcon}>{badge.icon}</Text>
            </View>
            <Text style={styles.badgeName}>{badge.name}</Text>
            <Text style={styles.badgeDescription}>{badge.description}</Text>
          </View>
        ))}
        
        {/* Next milestone preview */}
        <View style={[styles.badgeCard, styles.lockedBadge]}>
          <View style={styles.badgeIconContainer}>
            <Text style={styles.badgeIcon}>💎</Text>
          </View>
          <Text style={styles.badgeName}>First $1,000</Text>
          <Text style={styles.badgeDescription}>Save your first $1,000</Text>
          <View style={styles.lockedOverlay}>
            <Text style={styles.badgeLockIcon}>🔒</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LearnScreenBadges;
