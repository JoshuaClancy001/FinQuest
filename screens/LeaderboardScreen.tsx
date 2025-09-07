import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { leaderboardScreenStyles as styles } from '../styles/LeaderboardScreenStyles';

type LeaderboardView = 'global' | 'friends' | 'local';
type TimeframePeriod = 'daily' | 'weekly' | 'alltime';

export default function LeaderboardScreen(): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  // State for filters
  const [selectedView, setSelectedView] = useState<LeaderboardView>('global');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframePeriod>('weekly');

  // Current user info
  const currentUser = {
    id: 'user123',
    name: 'You',
    avatar: '👤',
    netWorth: 15750,
    rank: 47,
    change: '+3',
    streak: 12,
    level: 8,
    xp: 2150,
    badges: ['big-saver', 'consistent-trader'],
    titles: ['Market Apprentice', 'Savings Champion']
  };

  // Gamification data
  const badges = {
    'big-saver': { name: 'Big Saver', icon: '💰', color: '#059669', description: 'Saved the most this week' },
    'market-master': { name: 'Market Master', icon: '📈', color: '#3b82f6', description: 'Highest % returns' },
    'consistent-trader': { name: 'Consistent Trader', icon: '⚡', color: '#f59e0b', description: '7-day trading streak' },
    'risk-manager': { name: 'Risk Manager', icon: '🛡️', color: '#8b5cf6', description: 'Diversified portfolio' },
    'crash-survivor': { name: 'Crash Survivor', icon: '🏆', color: '#ef4444', description: 'Survived market crash with minimal losses' }
  };

  const challenges = [
    {
      id: 'beat-friends',
      title: 'Beat 3 friends\' net worth by Friday',
      description: 'Currently ahead of 1/3 friends',
      progress: 33,
      reward: 500,
      timeLeft: '3 days',
      icon: 'trophy',
      color: '#f59e0b'
    },
    {
      id: 'daily-streak',
      title: 'Complete 5 daily quests in a row',
      description: 'Build your learning streak',
      progress: 60,
      reward: 300,
      timeLeft: '2 days',
      icon: 'flame',
      color: '#ef4444'
    },
    {
      id: 'portfolio-growth',
      title: 'Grow portfolio by 10% this month',
      description: 'Smart investing challenge',
      progress: 75,
      reward: 1000,
      timeLeft: '12 days',
      icon: 'trending-up',
      color: '#059669'
    }
  ];

  // Dynamic event (market crash simulation)
  const dynamicEvent = {
    id: 'market-crash-2024',
    title: 'Market Volatility Event',
    description: 'Who can survive the storm with minimal losses?',
    icon: '⚡',
    isActive: true,
    timeLeft: '2h 15m',
    leaderboard: [
      { rank: 1, name: 'Emma Davis', avatar: '👩‍🎨', lossPercentage: -2.1, netWorth: 37850 },
      { rank: 2, name: 'You', avatar: '👤', lossPercentage: -3.5, netWorth: 15200 },
      { rank: 3, name: 'Tom Brown', avatar: '👨‍🏫', lossPercentage: -4.2, netWorth: 13600 },
    ]
  };

  // Social features
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const friendChallengeTemplates = [
    {
      id: 'savings-race',
      title: 'Savings Race',
      description: 'First to save $500 wins',
      goal: '$500 in savings',
      timeframe: '1 week',
      icon: '🏃‍♂️',
      reward: 'Winner gets 1000 XP bonus'
    },
    {
      id: 'investment-challenge',
      title: 'Smart Investor',
      description: 'Best portfolio performance',
      goal: 'Highest % returns',
      timeframe: '2 weeks',
      icon: '📈',
      reward: 'Winner gets Investment Master badge'
    },
    {
      id: 'streak-battle',
      title: 'Streak Battle',
      description: 'Longest daily quest streak',
      goal: '10-day streak',
      timeframe: '2 weeks',
      icon: '🔥',
      reward: 'Consistency Champion title'
    }
  ];

  const getShareableRank = () => {
    const viewNames = {
      global: 'FinanceQuest',
      friends: 'your friend circle',
      local: 'your area'
    };
    
    const timeframes = {
      daily: 'today',
      weekly: 'this week',
      alltime: 'all-time'
    };

    return {
      message: `You are #${currentUser.rank} in the Rankings ${timeframes[selectedTimeframe]} 🔥`,
      hashtags: '#FinanceQuest #LearnFinance #MoneyGoals',
      stats: `Level ${currentUser.level} • $${currentUser.netWorth.toLocaleString()} Net Worth • ${currentUser.xp.toLocaleString()} XP`
    };
  };

  // Leaderboard data for different views
  const leaderboardData = {
    global: {
      daily: [
        { id: '1', name: 'Alex Chen', avatar: '🧑‍💼', netWorth: 47250, rank: 1, change: '+5', level: 15, xp: 4800, isYou: false },
        { id: '2', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 2, change: '=', level: 14, xp: 4200, isYou: false },
        { id: '3', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 3, change: '-1', level: 13, xp: 3900, isYou: false },
        { id: '4', name: 'Emma Davis', avatar: '👩‍🎨', netWorth: 38600, rank: 4, change: '+2', level: 12, xp: 3600, isYou: false },
        { id: '5', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 5, change: '-2', level: 11, xp: 3200, isYou: false },
        { id: '47', name: 'You', avatar: '👤', netWorth: 15750, rank: 47, change: '+3', level: 8, xp: 2150, isYou: true },
      ],
      weekly: [
        { id: '1', name: 'Alex Chen', avatar: '🧑‍💼', netWorth: 47250, rank: 1, change: '+2', level: 15, xp: 4800, isYou: false },
        { id: '2', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 2, change: '+1', level: 14, xp: 4200, isYou: false },
        { id: '3', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 3, change: '=', level: 13, xp: 3900, isYou: false },
        { id: '4', name: 'Emma Davis', avatar: '👩‍🎨', netWorth: 38600, rank: 4, change: '+5', level: 12, xp: 3600, isYou: false },
        { id: '5', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 5, change: '-1', level: 11, xp: 3200, isYou: false },
        { id: '47', name: 'You', avatar: '👤', netWorth: 15750, rank: 47, change: '+8', level: 8, xp: 2150, isYou: true },
      ],
      alltime: [
        { id: '1', name: 'Alex Chen', avatar: '🧑‍💼', netWorth: 47250, rank: 1, change: 'NEW', level: 15, xp: 4800, isYou: false },
        { id: '2', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 2, change: 'NEW', level: 14, xp: 4200, isYou: false },
        { id: '3', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 3, change: 'NEW', level: 13, xp: 3900, isYou: false },
        { id: '4', name: 'Emma Davis', avatar: '👩‍🎨', netWorth: 38600, rank: 4, change: 'NEW', level: 12, xp: 3600, isYou: false },
        { id: '5', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 5, change: 'NEW', level: 11, xp: 3200, isYou: false },
        { id: '47', name: 'You', avatar: '👤', netWorth: 15750, rank: 47, change: 'NEW', level: 8, xp: 2150, isYou: true },
      ]
    },
    friends: {
      daily: [
        { id: '1', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 1, change: '+1', level: 14, xp: 4200, isYou: false },
        { id: '2', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 2, change: '=', level: 13, xp: 3900, isYou: false },
        { id: '3', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 3, change: '-1', level: 11, xp: 3200, isYou: false },
        { id: '4', name: 'You', avatar: '👤', netWorth: 15750, rank: 4, change: '+1', level: 8, xp: 2150, isYou: true },
        { id: '5', name: 'Lisa Chen', avatar: '👩‍🔬', netWorth: 12300, rank: 5, change: '=', level: 7, xp: 1800, isYou: false },
      ],
      weekly: [
        { id: '1', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 1, change: '=', level: 14, xp: 4200, isYou: false },
        { id: '2', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 2, change: '=', level: 13, xp: 3900, isYou: false },
        { id: '3', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 3, change: '=', level: 11, xp: 3200, isYou: false },
        { id: '4', name: 'You', avatar: '👤', netWorth: 15750, rank: 4, change: '+1', level: 8, xp: 2150, isYou: true },
        { id: '5', name: 'Lisa Chen', avatar: '👩‍🔬', netWorth: 12300, rank: 5, change: '-1', level: 7, xp: 1800, isYou: false },
      ],
      alltime: [
        { id: '1', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 1, change: 'NEW', level: 14, xp: 4200, isYou: false },
        { id: '2', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 2, change: 'NEW', level: 13, xp: 3900, isYou: false },
        { id: '3', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 3, change: 'NEW', level: 11, xp: 3200, isYou: false },
        { id: '4', name: 'You', avatar: '👤', netWorth: 15750, rank: 4, change: 'NEW', level: 8, xp: 2150, isYou: true },
        { id: '5', name: 'Lisa Chen', avatar: '👩‍🔬', netWorth: 12300, rank: 5, change: 'NEW', level: 7, xp: 1800, isYou: false },
      ]
    },
    local: {
      daily: [
        { id: '1', name: 'Emma Davis', avatar: '👩‍🎨', netWorth: 38600, rank: 1, change: '+2', level: 12, xp: 3600, isYou: false },
        { id: '2', name: 'You', avatar: '👤', netWorth: 15750, rank: 2, change: '+1', level: 8, xp: 2150, isYou: true },
        { id: '3', name: 'Tom Brown', avatar: '👨‍🏫', netWorth: 14200, rank: 3, change: '-1', level: 7, xp: 1950, isYou: false },
        { id: '4', name: 'Amy White', avatar: '👩‍⚕️', netWorth: 13800, rank: 4, change: '=', level: 6, xp: 1700, isYou: false },
        { id: '5', name: 'John Green', avatar: '👨‍💼', netWorth: 11500, rank: 5, change: '+1', level: 5, xp: 1400, isYou: false },
      ],
      weekly: [
        { id: '1', name: 'Emma Davis', avatar: '👩‍🎨', netWorth: 38600, rank: 1, change: '=', level: 12, xp: 3600, isYou: false },
        { id: '2', name: 'You', avatar: '👤', netWorth: 15750, rank: 2, change: '+2', level: 8, xp: 2150, isYou: true },
        { id: '3', name: 'Tom Brown', avatar: '👨‍🏫', netWorth: 14200, rank: 3, change: '-1', level: 7, xp: 1950, isYou: false },
        { id: '4', name: 'Amy White', avatar: '👩‍⚕️', netWorth: 13800, rank: 4, change: '=', level: 6, xp: 1700, isYou: false },
        { id: '5', name: 'John Green', avatar: '👨‍💼', netWorth: 11500, rank: 5, change: '-1', level: 5, xp: 1400, isYou: false },
      ],
      alltime: [
        { id: '1', name: 'Emma Davis', avatar: '👩‍🎨', netWorth: 38600, rank: 1, change: 'NEW', level: 12, xp: 3600, isYou: false },
        { id: '2', name: 'You', avatar: '👤', netWorth: 15750, rank: 2, change: 'NEW', level: 8, xp: 2150, isYou: true },
        { id: '3', name: 'Tom Brown', avatar: '👨‍🏫', netWorth: 14200, rank: 3, change: 'NEW', level: 7, xp: 1950, isYou: false },
        { id: '4', name: 'Amy White', avatar: '👩‍⚕️', netWorth: 13800, rank: 4, change: 'NEW', level: 6, xp: 1700, isYou: false },
        { id: '5', name: 'John Green', avatar: '👨‍💼', netWorth: 11500, rank: 5, change: 'NEW', level: 5, xp: 1400, isYou: false },
      ]
    }
  };

  // View tab options
  const viewTabs = [
    { id: 'global' as LeaderboardView, title: 'Global', icon: 'globe', description: 'Compete worldwide' },
    { id: 'friends' as LeaderboardView, title: 'Friends', icon: 'people', description: 'Your friend circle' },
    { id: 'local' as LeaderboardView, title: 'Local', icon: 'location', description: 'Your area' }
  ];

  // Timeframe options
  const timeframes = [
    { id: 'daily' as TimeframePeriod, title: 'Daily', icon: 'today' },
    { id: 'weekly' as TimeframePeriod, title: 'Weekly', icon: 'calendar' },
    { id: 'alltime' as TimeframePeriod, title: 'All-Time', icon: 'trophy' }
  ];

  const getCurrentData = () => {
    return leaderboardData[selectedView][selectedTimeframe];
  };

  const getTotalUsers = () => {
    const totals = {
      global: { daily: 1200, weekly: 1200, alltime: 1200 },
      friends: { daily: 5, weekly: 5, alltime: 5 },
      local: { daily: 148, weekly: 148, alltime: 148 }
    };
    return totals[selectedView][selectedTimeframe];
  };

  const getNearbyCompetitors = () => {
    const data = getCurrentData();
    const userIndex = data.findIndex(player => player.isYou);
    
    if (userIndex === -1) return { above: null, below: null };
    
    const above = userIndex > 0 ? data[userIndex - 1] : null;
    const below = userIndex < data.length - 1 ? data[userIndex + 1] : null;
    
    return { above, below };
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith('+')) return 'trending-up';
    if (change.startsWith('-')) return 'trending-down';
    if (change === '=') return 'remove';
    return 'star'; // for NEW
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith('+')) return '#34C759';
    if (change.startsWith('-')) return '#FF3B30';
    if (change === '=') return '#6b7280';
    return '#FF9500'; // for NEW
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
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

      {/* Leaderboard List */}
      <ScrollView 
        style={styles.leaderboardContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.leaderboardContent,
          { paddingHorizontal: isTablet ? 40 : 20 }
        ]}
      >
        {/* Dynamic Event Banner */}
        {dynamicEvent.isActive && (
          <View style={styles.dynamicEventBanner}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventIcon}>{dynamicEvent.icon}</Text>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{dynamicEvent.title}</Text>
                <Text style={styles.eventDescription}>{dynamicEvent.description}</Text>
              </View>
              <View style={styles.eventTimer}>
                <Ionicons name="time" size={16} color="#ef4444" />
                <Text style={styles.eventTimeLeft}>{dynamicEvent.timeLeft}</Text>
              </View>
            </View>
            
            <View style={styles.eventLeaderboard}>
              {dynamicEvent.leaderboard.map((player) => (
                <View key={player.rank} style={[
                  styles.eventPlayerRow,
                  player.name === 'You' && styles.eventPlayerRowHighlight
                ]}>
                  <Text style={styles.eventRank}>#{player.rank}</Text>
                  <Text style={styles.eventAvatar}>{player.avatar}</Text>
                  <Text style={[styles.eventPlayerName, player.name === 'You' && styles.eventYourName]}>
                    {player.name}
                  </Text>
                  <Text style={styles.eventLoss}>{player.lossPercentage}%</Text>
                  <Text style={styles.eventNetWorth}>${player.netWorth.toLocaleString()}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Gamification Section */}
        <View style={styles.gamificationSection}>
          {/* User Badges */}
          <View style={styles.badgesContainer}>
            <Text style={styles.sectionTitle}>Your Badges</Text>
            <View style={styles.badgesList}>
              {currentUser.badges.map((badgeId) => {
                const badge = badges[badgeId];
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

        {/* Regular Leaderboard */}
        <View style={styles.regularLeaderboard}>
          <Text style={styles.sectionTitle}>Rankings</Text>
          {getCurrentData().map((player, index) => (
            <View 
              key={player.id}
              style={[
                styles.playerCard,
                player.isYou && styles.playerCardHighlight,
                index < 3 && styles.topThreeCard
              ]}
            >
              {/* Rank Badge */}
              <View style={[
                styles.rankBadge,
                index < 3 && styles.topThreeRankBadge,
                player.isYou && styles.yourRankBadge
              ]}>
                {index < 3 ? (
                  <Ionicons 
                    name={index === 0 ? 'trophy' : index === 1 ? 'medal' : 'ribbon'} 
                    size={isTablet ? 24 : 20} 
                    color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'} 
                  />
                ) : (
                  <Text style={[
                    styles.rankNumber,
                    player.isYou && styles.yourRankNumber
                  ]}>
                    #{player.rank}
                  </Text>
                )}
              </View>

              {/* Player Info */}
              <View style={styles.playerInfo}>
                <View style={styles.playerHeader}>
                  <Text style={styles.playerAvatar}>{player.avatar}</Text>
                  <View style={styles.playerDetails}>
                    <View style={styles.playerNameContainer}>
                      <Text style={[
                        styles.playerName,
                        player.isYou && styles.yourPlayerName
                      ]}>
                        {player.name}
                      </Text>
                      {player.isYou && currentUser.badges.length > 0 && (
                        <View style={styles.playerBadges}>
                          {currentUser.badges.slice(0, 2).map((badgeId) => (
                            <Text key={badgeId} style={styles.miniBadge}>
                              {badges[badgeId].icon}
                            </Text>
                          ))}
                        </View>
                      )}
                    </View>
                    <Text style={styles.playerLevel}>Level {player.level}</Text>
                  </View>
                </View>
                
                <View style={styles.playerStats}>
                  <Text style={styles.playerNetWorth}>
                    ${player.netWorth.toLocaleString()}
                  </Text>
                  <Text style={styles.playerXP}>
                    {player.xp.toLocaleString()} XP
                  </Text>
                </View>
              </View>

              {/* Change Indicator */}
              <View style={styles.changeIndicator}>
                <Ionicons 
                  name={getChangeIcon(player.change)} 
                  size={16} 
                  color={getChangeColor(player.change)} 
                />
                <Text style={[
                  styles.changeText,
                  { color: getChangeColor(player.change) }
                ]}>
                  {player.change}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sticky User Position */}
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

      {/* Challenge Modal */}
      <Modal
        visible={showChallengeModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Challenge a Friend</Text>
            <TouchableOpacity onPress={() => setShowChallengeModal(false)}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>Choose a challenge to send to your friends:</Text>
            
            {friendChallengeTemplates.map((challenge) => (
              <TouchableOpacity
                key={challenge.id}
                style={styles.challengeTemplate}
                onPress={() => {
                  Alert.alert(
                    'Challenge Sent!',
                    `You've challenged your friends to "${challenge.title}". They'll receive a notification to accept or decline.`,
                    [{ text: 'OK', onPress: () => setShowChallengeModal(false) }]
                  );
                }}
              >
                <View style={styles.challengeTemplateHeader}>
                  <Text style={styles.challengeTemplateIcon}>{challenge.icon}</Text>
                  <View style={styles.challengeTemplateInfo}>
                    <Text style={styles.challengeTemplateTitle}>{challenge.title}</Text>
                    <Text style={styles.challengeTemplateDescription}>{challenge.description}</Text>
                  </View>
                </View>
                
                <View style={styles.challengeTemplateDetails}>
                  <View style={styles.challengeTemplateRow}>
                    <Text style={styles.challengeTemplateLabel}>Goal:</Text>
                    <Text style={styles.challengeTemplateValue}>{challenge.goal}</Text>
                  </View>
                  <View style={styles.challengeTemplateRow}>
                    <Text style={styles.challengeTemplateLabel}>Duration:</Text>
                    <Text style={styles.challengeTemplateValue}>{challenge.timeframe}</Text>
                  </View>
                  <View style={styles.challengeTemplateRow}>
                    <Text style={styles.challengeTemplateLabel}>Reward:</Text>
                    <Text style={styles.challengeTemplateValue}>{challenge.reward}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Share Modal */}
      <Modal
        visible={showShareModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Share Your Achievement</Text>
            <TouchableOpacity onPress={() => setShowShareModal(false)}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.sharePreview}>
              <Text style={styles.shareMessage}>{getShareableRank().message}</Text>
              <Text style={styles.shareStats}>{getShareableRank().stats}</Text>
              <Text style={styles.shareHashtags}>{getShareableRank().hashtags}</Text>
            </View>
            
            <View style={styles.shareOptions}>
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={() => {
                  Alert.alert('Shared!', 'Your achievement has been shared to your story.');
                  setShowShareModal(false);
                }}
              >
                <Ionicons name="logo-instagram" size={24} color="#E4405F" />
                <Text style={styles.shareButtonText}>Instagram Story</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={() => {
                  Alert.alert('Shared!', 'Your achievement has been posted to Twitter.');
                  setShowShareModal(false);
                }}
              >
                <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                <Text style={styles.shareButtonText}>Twitter</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={() => {
                  Alert.alert('Shared!', 'Your achievement has been shared to Snapchat.');
                  setShowShareModal(false);
                }}
              >
                <Ionicons name="camera" size={24} color="#FFFC00" />
                <Text style={styles.shareButtonText}>Snapchat</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.shareButton}
                onPress={() => {
                  Alert.alert('Copied!', 'Share text copied to clipboard.');
                  setShowShareModal(false);
                }}
              >
                <Ionicons name="copy" size={24} color="#6b7280" />
                <Text style={styles.shareButtonText}>Copy Text</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
