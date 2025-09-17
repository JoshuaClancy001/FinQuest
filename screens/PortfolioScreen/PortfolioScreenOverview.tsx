import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioScreenStyles as styles } from '../../styles/PortfolioScreenStyles';

// Type definitions
interface User {
  streak: number;
  portfolio: {
    totalValue: number;
    individualStocksValue: number;
    etfsValue: number;
    realEstateValue: number;
    totalChangeIsPositive?: boolean;
    totalDailyChangePercent?: number;
    totalDailyChangeAmount?: number;
    totalWeeklyChangePercent?: number;
    totalWeeklyChangeAmount?: number;
  };
  cash: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress: number;
  reward: string;
}

interface LeaderboardPlayer {
  rank: number;
  name: string;
  netWorth: number;
  you: boolean;
}

interface MarketEvent {
  type: string;
  title: string;
  description: string;
  impact: string;
  color: string;
  icon: string;
  decision: string;
}

interface Props {
  user: User | null;
  achievements: Achievement[];
  leaderboardData: LeaderboardPlayer[];
  currentEvent: MarketEvent;
  setShowAchievements: (show: boolean) => void;
  setShowMarketEvent: (show: boolean) => void;
}

export default function PortfolioScreenOverview({
  user,
  achievements,
  leaderboardData,
  currentEvent,
  setShowAchievements,
  setShowMarketEvent
}: Props): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={[
      styles.overviewSection, 
      { 
        paddingHorizontal: isTablet ? 40 : 20,
        marginTop: isAndroid ? 10 : 0  // Additional margin for Android
      }
    ]}>
      <View style={styles.overviewHeader}>
        <Text style={[styles.overviewTitle, { fontSize: isTablet ? 32 : 24 }]}>
          Portfolio Overview
        </Text>
        <View style={styles.gamificationControls}>
          {user && (
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={isTablet ? 20 : 16} color="#fff" />
              <Text style={[styles.streakText, { fontSize: isTablet ? 14 : 12 }]}>
                {user.streak}
              </Text>
            </View>
          )}
          <TouchableOpacity 
            style={styles.achievementButton}
            onPress={() => setShowAchievements(true)}
          >
            <Ionicons name="trophy" size={isTablet ? 20 : 18} color="#FFD700" />
            <Text style={styles.achievementCount}>
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.netWorthContainer}>
        <View style={styles.netWorthCard}>
          <View style={styles.netWorthHeader}>
            <View style={styles.netWorthIconContainer}>
              <Ionicons name="trending-up" size={isTablet ? 28 : 24} color="#fff" />
            </View>
            <View style={styles.netWorthInfo}>
              <Text style={[styles.netWorthLabel, { fontSize: isTablet ? 18 : 16 }]}>
                Total Net Worth
              </Text>
              <Text style={[styles.netWorthValue, { fontSize: isTablet ? 42 : 36 }]}>
                ${user ? (user.portfolio.totalValue + user.cash).toLocaleString() : '0'}
              </Text>
            </View>
          </View>
          
          {/* Mini Portfolio Breakdown */}
          <View style={styles.portfolioBreakdown}>
            <View style={styles.breakdownItem}>
              <View style={[styles.breakdownDot, { backgroundColor: '#34C759' }]} />
              <Text style={styles.breakdownLabel}>Stocks</Text>
              <Text style={styles.breakdownValue}>${user ? user.portfolio.individualStocksValue.toLocaleString() : '0'}</Text>
            </View>
            <View style={styles.breakdownItem}>
              <View style={[styles.breakdownDot, { backgroundColor: '#007AFF' }]} />
              <Text style={styles.breakdownLabel}>ETFs</Text>
              <Text style={styles.breakdownValue}>${user ? user.portfolio.etfsValue.toLocaleString() : '0'}</Text>
            </View>
            <View style={styles.breakdownItem}>
              <View style={[styles.breakdownDot, { backgroundColor: '#FF9500' }]} />
              <Text style={styles.breakdownLabel}>Real Estate</Text>
              <Text style={styles.breakdownValue}>${user ? user.portfolio.realEstateValue.toLocaleString() : '0'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.changeIndicators}>
        {/* Daily Change */}
        <View style={styles.changeItem}>
          <View style={styles.changeHeader}>
            <Ionicons 
              name={(user?.portfolio.totalChangeIsPositive ?? true) ? "trending-up" : "trending-down"} 
              size={isTablet ? 24 : 20} 
              color={(user?.portfolio.totalChangeIsPositive ?? true) ? "#34C759" : "#FF3B30"} 
            />
            <Text style={[styles.changeLabel, { fontSize: isTablet ? 14 : 12 }]}>
              Daily Change
            </Text>
          </View>
          <View style={[styles.changeValueContainer, {
            backgroundColor: (user?.portfolio.totalChangeIsPositive ?? true) ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)'
          }]}>
            <Text style={[
              styles.changeValue,
              { 
                color: (user?.portfolio.totalChangeIsPositive ?? true) ? "#34C759" : "#FF3B30",
                fontSize: isTablet ? 18 : 16
              }
            ]}>
              {(user?.portfolio.totalChangeIsPositive ?? true) ? '+' : ''}{(user?.portfolio.totalDailyChangePercent ?? 0).toFixed(1)}%
            </Text>
            <Text style={[
              styles.changeAmount,
              { 
                color: (user?.portfolio.totalChangeIsPositive ?? true) ? "#34C759" : "#FF3B30",
                fontSize: isTablet ? 14 : 12
              }
            ]}>
              ({(user?.portfolio.totalChangeIsPositive ?? true) ? '+' : ''}${(user?.portfolio.totalDailyChangeAmount ?? 0).toFixed(0)})
            </Text>
          </View>
        </View>

        {/* Weekly Change */}
        <View style={styles.changeItem}>
          <View style={styles.changeHeader}>
            <Ionicons 
              name={(user?.portfolio.totalWeeklyChangePercent ?? 0) >= 0 ? "trending-up" : "trending-down"} 
              size={isTablet ? 24 : 20} 
              color={(user?.portfolio.totalWeeklyChangePercent ?? 0) >= 0 ? "#34C759" : "#FF3B30"} 
            />
            <Text style={[styles.changeLabel, { fontSize: isTablet ? 14 : 12 }]}>
              Weekly Change
            </Text>
          </View>
          <View style={[styles.changeValueContainer, {
            backgroundColor: (user?.portfolio.totalWeeklyChangePercent ?? 0) >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)'
          }]}>
            <Text style={[
              styles.changeValue,
              { 
                color: (user?.portfolio.totalWeeklyChangePercent ?? 0) >= 0 ? "#34C759" : "#FF3B30",
                fontSize: isTablet ? 18 : 16
              }
            ]}>
              {(user?.portfolio.totalWeeklyChangePercent ?? 0) >= 0 ? '+' : ''}{(user?.portfolio.totalWeeklyChangePercent ?? 0).toFixed(1)}%
            </Text>
            <Text style={[
              styles.changeAmount,
              { 
                color: (user?.portfolio.totalWeeklyChangePercent ?? 0) >= 0 ? "#34C759" : "#FF3B30",
                fontSize: isTablet ? 14 : 12
              }
            ]}>
              ({(user?.portfolio.totalWeeklyChangePercent ?? 0) >= 0 ? '+' : ''}${(user?.portfolio.totalWeeklyChangeAmount ?? 0).toFixed(0)})
            </Text>
          </View>
        </View>
      </View>

      {/* Market Event Alert */}
      <TouchableOpacity 
        style={styles.marketEventAlert}
        onPress={() => setShowMarketEvent(true)}
      >
        <View style={styles.marketEventHeader}>
          <Ionicons name={currentEvent.icon as any} size={20} color={currentEvent.color} />
          <Text style={[styles.marketEventTitle, { color: currentEvent.color }]}>
            {currentEvent.title}
          </Text>
          <Text style={styles.marketEventImpact}>{currentEvent.impact}</Text>
        </View>
        <Text style={styles.marketEventDescription}>
          {currentEvent.description}
        </Text>
      </TouchableOpacity>

      {/* Leaderboard Teaser */}
      <View style={styles.leaderboardTeaser}>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardTitle}>Global Rankings</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.leaderboardList}>
          {leaderboardData.slice(0, 3).map((player) => (
            <View 
              key={player.rank} 
              style={[
                styles.leaderboardItem,
                player.you && styles.leaderboardItemHighlight
              ]}
            >
              <Text style={styles.playerRank}>#{player.rank}</Text>
              <Text style={[
                styles.playerName,
                player.you && styles.playerNameHighlight
              ]}>
                {player.name}
              </Text>
              <Text style={styles.playerNetWorth}>
                ${player.netWorth.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
