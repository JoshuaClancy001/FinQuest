import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { leaderboardScreenStyles as styles } from '../../styles/LeaderboardScreenStyles';

// Types
interface Player {
  id: string;
  name: string;
  avatar: string;
  netWorth: number;
  rank: number;
  change: string;
  level: number;
  xp: number;
  isYou: boolean;
}

interface CurrentUser {
  id: string;
  name: string;
  avatar: string;
  netWorth: number;
  rank: number;
  change: string;
  streak: number;
  level: number;
  xp: number;
  badges: string[];
  titles: string[];
}

type TimeframePeriod = 'daily' | 'weekly' | 'alltime';

interface LeaderboardScreenUserPositionProps {
  currentUser: CurrentUser;
  getTotalUsers: () => number;
  selectedTimeframe: TimeframePeriod;
  getNearbyCompetitors: () => { above: Player | null; below: Player | null };
}

export default function LeaderboardScreenUserPosition({
  currentUser,
  getTotalUsers,
  selectedTimeframe,
  getNearbyCompetitors
}: LeaderboardScreenUserPositionProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  return (
    <View style={[
      styles.stickyUserPosition,
      { paddingHorizontal: isTablet ? 40 : 20 }
    ]}>
      <View style={styles.userPositionHeader}>
        <Text style={styles.userPositionTitle}>
          You are #{currentUser.rank} out of {getTotalUsers().toLocaleString()} this {selectedTimeframe === 'alltime' ? 'all-time' : selectedTimeframe}!
        </Text>
      </View>

      {/* Nearby Competitors */}
      {(() => {
        const { above, below } = getNearbyCompetitors();
        return (
          <View style={styles.nearbyCompetitors}>
            {above && (
              <View style={styles.competitorRow}>
                <View style={styles.competitorInfo}>
                  <Text style={styles.competitorAvatar}>{above.avatar}</Text>
                  <View style={styles.competitorDetails}>
                    <Text style={styles.competitorName}>#{above.rank} {above.name}</Text>
                    <Text style={styles.competitorValue}>${above.netWorth.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.competitorGap}>
                  <Ionicons name="arrow-up" size={16} color="#FF9500" />
                  <Text style={styles.gapText}>
                    ${(above.netWorth - currentUser.netWorth).toLocaleString()} ahead
                  </Text>
                </View>
              </View>
            )}

            {/* Current User Row */}
            <View style={[styles.competitorRow, styles.currentUserRow]}>
              <View style={styles.competitorInfo}>
                <Text style={styles.competitorAvatar}>{currentUser.avatar}</Text>
                <View style={styles.competitorDetails}>
                  <Text style={[styles.competitorName, styles.currentUserName]}>
                    #{currentUser.rank} You
                  </Text>
                  <Text style={styles.competitorValue}>${currentUser.netWorth.toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>Lv.{currentUser.level}</Text>
              </View>
            </View>

            {below && (
              <View style={styles.competitorRow}>
                <View style={styles.competitorInfo}>
                  <Text style={styles.competitorAvatar}>{below.avatar}</Text>
                  <View style={styles.competitorDetails}>
                    <Text style={styles.competitorName}>#{below.rank} {below.name}</Text>
                    <Text style={styles.competitorValue}>${below.netWorth.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={styles.competitorGap}>
                  <Ionicons name="arrow-down" size={16} color="#34C759" />
                  <Text style={styles.gapText}>
                    ${(currentUser.netWorth - below.netWorth).toLocaleString()} behind
                  </Text>
                </View>
              </View>
            )}
          </View>
        );
      })()}
    </View>
  );
}
