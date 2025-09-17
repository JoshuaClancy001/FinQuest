import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeScreenStyles as styles } from '../../styles/HomeScreenStyles';
import { LeaderboardData } from '../../types';

interface HomeScreenLeaderboardProps {
  leaderboardData: LeaderboardData;
  onLeaderboardPress: () => void;
}

export default function HomeScreenLeaderboard({ leaderboardData, onLeaderboardPress }: HomeScreenLeaderboardProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  return (
    <View style={[styles.leaderboardSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
      <TouchableOpacity 
        style={styles.leaderboardCard}
        onPress={onLeaderboardPress}
      >
        <View style={styles.leaderboardHeader}>
          <View style={styles.leaderboardRank}>
            <Ionicons name="trophy" size={24} color="#FFD700" />
            <Text style={styles.leaderboardRankText}>#{leaderboardData.weeklyRank}</Text>
          </View>
          <Text style={styles.leaderboardPeriod}>This Week</Text>
        </View>
        
        <Text style={styles.leaderboardTitle}>
          You're #{leaderboardData.weeklyRank} this week — beat {leaderboardData.friendsAhead} friends to climb!
        </Text>
        
        <View style={styles.leaderboardStats}>
          <View style={styles.leaderboardStat}>
            <Text style={styles.leaderboardStatValue}>{leaderboardData.weeklyPoints}</Text>
            <Text style={styles.leaderboardStatLabel}>Points</Text>
          </View>
          <View style={styles.leaderboardDivider} />
          <View style={styles.leaderboardStat}>
            <Text style={styles.leaderboardStatValue}>{leaderboardData.pointsToNext}</Text>
            <Text style={styles.leaderboardStatLabel}>To Beat Next</Text>
          </View>
        </View>
        
        <View style={styles.leaderboardAction}>
          <Text style={styles.leaderboardActionText}>View Full Leaderboard →</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
