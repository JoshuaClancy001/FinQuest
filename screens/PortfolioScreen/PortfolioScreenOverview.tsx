import React, { useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { portfolioScreenStyles as styles } from '../../styles/PortfolioScreenStyles';
import { User } from '../../types/user';

// Type definitions
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
  updateUser: (updates: Partial<User>) => void;
}

export default function PortfolioScreenOverview({
  user,
  achievements,
  leaderboardData,
  currentEvent,
  setShowAchievements,
  setShowMarketEvent,
  updateUser
}: Props): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  // Ref to track if we've updated portfolio for this focus session
  const hasUpdatedThisSession = useRef(false);

  // useFocusEffect to randomize daily and weekly changes each time screen is focused
  useFocusEffect(
    useCallback(() => {
      const updateDailyChanges = () => {
        // Only update if we haven't updated this session and user exists
        if (!hasUpdatedThisSession.current && user && user.portfolio) {
          try {
            // Generate random changes between -2.0 and 2.0
            const dailyChangePercent = (Math.random() * 4 - 2); // -2.0 to 2.0
            const weeklyChangePercent = (Math.random() * 4 - 2); // -2.0 to 2.0
            
            // Calculate change amounts based on portfolio value
            const portfolioValue = user.portfolio.totalValue || 0;
            const dailyChangeAmount = (portfolioValue * dailyChangePercent) / 100;
            const weeklyChangeAmount = (portfolioValue * weeklyChangePercent) / 100;
            
            // Update portfolio properties directly
            user.portfolio.totalDailyChangePercent = dailyChangePercent;
            user.portfolio.totalDailyChangeAmount = dailyChangeAmount;
            user.portfolio.totalWeeklyChangePercent = weeklyChangePercent;
            user.portfolio.totalWeeklyChangeAmount = weeklyChangeAmount;
            user.portfolio.totalChangeIsPositive = dailyChangePercent >= 0;

            // Trigger a state update by updating user context
            updateUser({ ...user });
            
            // Mark that we've updated for this session
            hasUpdatedThisSession.current = true;
            
            console.log('Portfolio changes updated:', {
              daily: `${dailyChangePercent.toFixed(2)}%`,
              weekly: `${weeklyChangePercent.toFixed(2)}%`
            });
          } catch (error) {
            console.error('Error updating daily changes:', error);
          }
        }
      };

      // Reset the flag when screen comes into focus
      hasUpdatedThisSession.current = false;
      updateDailyChanges();

      // Return cleanup function to reset flag when screen loses focus
      return () => {
        hasUpdatedThisSession.current = false;
      };
    }, [])
  );

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
              {(user?.portfolio.totalChangeIsPositive ?? true) ? '+' : ''}{(user?.portfolio.totalDailyChangePercent ?? 0).toFixed(2)}%
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
    </View>
  );
}
