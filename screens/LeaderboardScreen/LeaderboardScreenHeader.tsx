import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { leaderboardScreenStyles as styles } from '../../styles/LeaderboardScreenStyles';

// Types
type LeaderboardView = 'friends' | 'forbes';
type TimeframePeriod = 'daily' | 'weekly' | 'alltime';

interface ViewTab {
  id: LeaderboardView;
  title: string;
  icon: string;
  description: string;
}

interface Timeframe {
  id: TimeframePeriod;
  title: string;
  icon: string;
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

interface LeaderboardScreenHeaderProps {
  currentUser: CurrentUser;
  selectedView: LeaderboardView;
  selectedTimeframe: TimeframePeriod;
  viewTabs: ViewTab[];
  timeframes: Timeframe[];
  setSelectedView: (view: LeaderboardView) => void;
  setSelectedTimeframe: (timeframe: TimeframePeriod) => void;
  setShowChallengeModal: (show: boolean) => void;
  setShowShareModal: (show: boolean) => void;
}

export default function LeaderboardScreenHeader({
  currentUser,
  selectedView,
  selectedTimeframe,
  viewTabs,
  timeframes,
  setSelectedView,
  setSelectedTimeframe,
  setShowChallengeModal,
  setShowShareModal
}: LeaderboardScreenHeaderProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={[
      styles.headerSection,
      { 
        paddingHorizontal: isTablet ? 40 : 20,
        paddingTop: isAndroid ? 20 : 0
      }
    ]}>
      <View style={styles.headerTop}>
        <Text style={[styles.headerTitle, { fontSize: isTablet ? 32 : 28 }]}>
          Leaderboard
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => setShowChallengeModal(true)}
          >
            <Ionicons name="people" size={16} color="#007AFF" />
            <Text style={styles.socialButtonText}>Challenge</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => setShowShareModal(true)}
          >
            <Ionicons name="share" size={16} color="#007AFF" />
            <Text style={styles.socialButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.headerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Your Rank</Text>
          <Text style={styles.statValue}>#{currentUser.rank}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Level</Text>
          <Text style={styles.statValue}>{currentUser.level}</Text>
        </View>
      </View>

      {/* View Tabs */}
      <View style={styles.viewTabs}>
        {viewTabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.viewTab,
              selectedView === tab.id && styles.viewTabActive
            ]}
            onPress={() => setSelectedView(tab.id)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={isTablet ? 24 : 20} 
              color={selectedView === tab.id ? '#007AFF' : '#6b7280'} 
            />
            <Text style={[
              styles.viewTabText,
              selectedView === tab.id && styles.viewTabTextActive
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timeframe Filters */}
      <View style={styles.timeframeFilters}>
        {timeframes.map((timeframe) => (
          <TouchableOpacity
            key={timeframe.id}
            style={[
              styles.timeframeButton,
              selectedTimeframe === timeframe.id && styles.timeframeButtonActive
            ]}
            onPress={() => setSelectedTimeframe(timeframe.id)}
          >
            <Ionicons 
              name={timeframe.icon as any} 
              size={16} 
              color={selectedTimeframe === timeframe.id ? '#fff' : '#6b7280'} 
            />
            <Text style={[
              styles.timeframeButtonText,
              selectedTimeframe === timeframe.id && styles.timeframeButtonTextActive
            ]}>
              {timeframe.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
