import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { leaderboardScreenStyles as styles } from '../../styles/LeaderboardScreenStyles';

// Type definitions
interface Badge {
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  reward: number;
  timeLeft: string;
  icon: string;
  color: string;
}

interface CurrentUser {
  badges: string[];
}

interface Props {
  currentUser: CurrentUser;
  badges: Record<string, Badge>;
  challenges: Challenge[];
}

export default function LeaderboardScreenGamification({
  currentUser,
  badges,
  challenges
}: Props): React.JSX.Element {
  return (
    <View style={styles.gamificationSection}>
      {/* User Badges */}
      <View style={styles.badgesContainer}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <View style={styles.badgesList}>
          {currentUser.badges.map((badgeId) => {
            const badge = badges[badgeId];
            if (!badge) return null; // Safety check for unknown badge IDs
            return (
              <View key={badgeId} style={[styles.badgeItem, { borderColor: badge.color }]}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            );
          })}
          <View style={styles.earnMoreBadge}>
            <Ionicons name="add" size={20} color="#6b7280" />
            <Text style={styles.earnMoreText}>Earn More</Text>
          </View>
        </View>
      </View>

      {/* Active Challenges */}
      <View style={styles.challengesContainer}>
        <Text style={styles.sectionTitle}>Active Challenges</Text>
        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeIcon}>
                <Ionicons name={challenge.icon as any} size={20} color={challenge.color} />
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
              </View>
              <View style={styles.challengeReward}>
                <Text style={styles.rewardAmount}>+{challenge.reward}</Text>
                <Text style={styles.rewardCurrency}>XP</Text>
              </View>
            </View>
            
            <View style={styles.challengeProgress}>
              <View style={styles.progressBar}>
                <View style={[
                  styles.progressFill,
                  { width: `${challenge.progress}%`, backgroundColor: challenge.color }
                ]} />
              </View>
              <Text style={styles.progressText}>{challenge.progress}%</Text>
            </View>
            
            <View style={styles.challengeFooter}>
              <Text style={styles.timeLeftText}>{challenge.timeLeft} left</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
