import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { leaderboardScreenStyles as styles } from '../../styles/LeaderboardScreenStyles';
import { useUser } from '../../contexts/UserContext';
import LeaderboardScreenGamification from './LeaderboardScreenGamification';
import LeaderboardScreenRankings from './LeaderboardScreenRankings';
import LeaderboardScreenUserPosition from './LeaderboardScreenUserPosition';
import LeaderboardScreenHeader from './LeaderboardScreenHeader';
import LeaderboardScreenModals from './LeaderboardScreenModals';

type LeaderboardView = 'friends' | 'forbes';
type TimeframePeriod = 'daily' | 'weekly' | 'alltime';

export default function LeaderboardScreen(): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  // Get user from context
  const { user } = useUser();

  // State for filters
  const [selectedView, setSelectedView] = useState<LeaderboardView>('forbes');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframePeriod>('weekly');

  // Current user info (from context with fallback)
  const currentUser = user ? {
    id: user.id,
    name: user.username,
    avatar: user.avatar,
    netWorth: user.portfolio.totalValue + user.cash,
    rank: user.rank,
    change: user.change,
    streak: user.streak,
    level: user.level,
    xp: user.xp,
    badges: user.badges,
    titles: user.titles
  } : {
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
  const badges: Record<string, { name: string; icon: string; color: string; description: string }> = {
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

  // Social features
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Leaderboard data for different views
  const leaderboardData = {
    forbes: {
      daily: [
        { id: '1', name: 'Marcus Sterling', avatar: '👔', netWorth: 2450000, rank: 1, change: '+1', level: 50, xp: 50000, isYou: false },
        { id: '2', name: 'Sofia Goldman', avatar: '�', netWorth: 1980000, rank: 2, change: '=', level: 48, xp: 48000, isYou: false },
        { id: '3', name: 'Alexander Kane', avatar: '🎩', netWorth: 1750000, rank: 3, change: '-1', level: 47, xp: 47000, isYou: false },
        { id: '4', name: 'Victoria Cross', avatar: '�', netWorth: 1520000, rank: 4, change: '+2', level: 45, xp: 45000, isYou: false },
        { id: '5', name: 'Benjamin Frost', avatar: '🏆', netWorth: 1340000, rank: 5, change: '=', level: 43, xp: 43000, isYou: false },
        { id: '6', name: 'Isabella Stone', avatar: '⭐', netWorth: 1200000, rank: 6, change: '+1', level: 42, xp: 42000, isYou: false },
        { id: '7', name: 'Maximilian Grey', avatar: '�', netWorth: 980000, rank: 7, change: '-1', level: 40, xp: 40000, isYou: false },
        { id: '8', name: 'Anastasia Vale', avatar: '💫', netWorth: 850000, rank: 8, change: '=', level: 38, xp: 38000, isYou: false },
        { id: '9', name: 'Sebastian Pike', avatar: '�', netWorth: 720000, rank: 9, change: '+1', level: 35, xp: 35000, isYou: false },
        { id: '10', name: 'Olivia Nash', avatar: '✨', netWorth: 650000, rank: 10, change: '-1', level: 33, xp: 33000, isYou: false },
        { id: '124850', name: currentUser.name, avatar: currentUser.avatar, netWorth: currentUser.netWorth, rank: 124850, change: '+1250', level: currentUser.level, xp: currentUser.xp, isYou: true },
      ],
      weekly: [
        { id: '1', name: 'Marcus Sterling', avatar: '👔', netWorth: 2450000, rank: 1, change: '=', level: 50, xp: 50000, isYou: false },
        { id: '2', name: 'Sofia Goldman', avatar: '�', netWorth: 1980000, rank: 2, change: '+1', level: 48, xp: 48000, isYou: false },
        { id: '3', name: 'Alexander Kane', avatar: '🎩', netWorth: 1750000, rank: 3, change: '-1', level: 47, xp: 47000, isYou: false },
        { id: '4', name: 'Victoria Cross', avatar: '�', netWorth: 1520000, rank: 4, change: '=', level: 45, xp: 45000, isYou: false },
        { id: '5', name: 'Benjamin Frost', avatar: '🏆', netWorth: 1340000, rank: 5, change: '=', level: 43, xp: 43000, isYou: false },
        { id: '6', name: 'Isabella Stone', avatar: '⭐', netWorth: 1200000, rank: 6, change: '=', level: 42, xp: 42000, isYou: false },
        { id: '7', name: 'Maximilian Grey', avatar: '�', netWorth: 980000, rank: 7, change: '=', level: 40, xp: 40000, isYou: false },
        { id: '8', name: 'Anastasia Vale', avatar: '💫', netWorth: 850000, rank: 8, change: '=', level: 38, xp: 38000, isYou: false },
        { id: '9', name: 'Sebastian Pike', avatar: '�', netWorth: 720000, rank: 9, change: '=', level: 35, xp: 35000, isYou: false },
        { id: '10', name: 'Olivia Nash', avatar: '✨', netWorth: 650000, rank: 10, change: '=', level: 33, xp: 33000, isYou: false },
        { id: '124850', name: currentUser.name, avatar: currentUser.avatar, netWorth: currentUser.netWorth, rank: 124850, change: '+2850', level: currentUser.level, xp: currentUser.xp, isYou: true },
      ],
      alltime: [
        { id: '1', name: 'Marcus Sterling', avatar: '👔', netWorth: 2450000, rank: 1, change: 'NEW', level: 50, xp: 50000, isYou: false },
        { id: '2', name: 'Sofia Goldman', avatar: '�', netWorth: 1980000, rank: 2, change: 'NEW', level: 48, xp: 48000, isYou: false },
        { id: '3', name: 'Alexander Kane', avatar: '🎩', netWorth: 1750000, rank: 3, change: 'NEW', level: 47, xp: 47000, isYou: false },
        { id: '4', name: 'Victoria Cross', avatar: '�', netWorth: 1520000, rank: 4, change: 'NEW', level: 45, xp: 45000, isYou: false },
        { id: '5', name: 'Benjamin Frost', avatar: '🏆', netWorth: 1340000, rank: 5, change: 'NEW', level: 43, xp: 43000, isYou: false },
        { id: '6', name: 'Isabella Stone', avatar: '⭐', netWorth: 1200000, rank: 6, change: 'NEW', level: 42, xp: 42000, isYou: false },
        { id: '7', name: 'Maximilian Grey', avatar: '�', netWorth: 980000, rank: 7, change: 'NEW', level: 40, xp: 40000, isYou: false },
        { id: '8', name: 'Anastasia Vale', avatar: '💫', netWorth: 850000, rank: 8, change: 'NEW', level: 38, xp: 38000, isYou: false },
        { id: '9', name: 'Sebastian Pike', avatar: '�', netWorth: 720000, rank: 9, change: 'NEW', level: 35, xp: 35000, isYou: false },
        { id: '10', name: 'Olivia Nash', avatar: '✨', netWorth: 650000, rank: 10, change: 'NEW', level: 33, xp: 33000, isYou: false },
        { id: '124850', name: currentUser.name, avatar: currentUser.avatar, netWorth: currentUser.netWorth, rank: 124850, change: 'NEW', level: currentUser.level, xp: currentUser.xp, isYou: true },
      ]
    },
    friends: {
      daily: [
        { id: '1', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 1, change: '+1', level: 14, xp: 4200, isYou: false },
        { id: '2', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 2, change: '=', level: 13, xp: 3900, isYou: false },
        { id: '3', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 3, change: '-1', level: 11, xp: 3200, isYou: false },
        { id: '4', name: currentUser.name, avatar: currentUser.avatar, netWorth: currentUser.netWorth, rank: currentUser.rank, change: currentUser.change, level: currentUser.level, xp: currentUser.xp, isYou: true },
        { id: '5', name: 'Lisa Chen', avatar: '👩‍🔬', netWorth: 12300, rank: 5, change: '=', level: 7, xp: 1800, isYou: false },
      ],
      weekly: [
        { id: '1', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 1, change: '=', level: 14, xp: 4200, isYou: false },
        { id: '2', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 2, change: '=', level: 13, xp: 3900, isYou: false },
        { id: '3', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 3, change: '=', level: 11, xp: 3200, isYou: false },
        { id: '4', name: currentUser.name, avatar: currentUser.avatar, netWorth: currentUser.netWorth, rank: currentUser.rank, change: '+1', level: currentUser.level, xp: currentUser.xp, isYou: true },
        { id: '5', name: 'Lisa Chen', avatar: '👩‍🔬', netWorth: 12300, rank: 5, change: '-1', level: 7, xp: 1800, isYou: false },
      ],
      alltime: [
        { id: '1', name: 'Sarah Kim', avatar: '👩‍💻', netWorth: 45100, rank: 1, change: 'NEW', level: 14, xp: 4200, isYou: false },
        { id: '2', name: 'Mike Johnson', avatar: '👨‍🚀', netWorth: 42900, rank: 2, change: 'NEW', level: 13, xp: 3900, isYou: false },
        { id: '3', name: 'Jake Wilson', avatar: '👨‍🎓', netWorth: 35200, rank: 3, change: 'NEW', level: 11, xp: 3200, isYou: false },
        { id: '4', name: currentUser.name, avatar: currentUser.avatar, netWorth: currentUser.netWorth, rank: currentUser.rank, change: 'NEW', level: currentUser.level, xp: currentUser.xp, isYou: true },
        { id: '5', name: 'Lisa Chen', avatar: '👩‍🔬', netWorth: 12300, rank: 5, change: 'NEW', level: 7, xp: 1800, isYou: false },
      ]
    }
  };

  // View tab options
  const viewTabs = [
    { id: 'forbes' as LeaderboardView, title: 'Wealth Leaders', icon: 'diamond', description: 'Top money earners' },
    { id: 'friends' as LeaderboardView, title: 'Friends', icon: 'people', description: 'Your friend circle' }
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
      forbes: { daily: 125000, weekly: 125000, alltime: 125000 },
      friends: { daily: 5, weekly: 5, alltime: 5 }
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
      <LeaderboardScreenHeader 
        currentUser={currentUser}
        selectedView={selectedView}
        selectedTimeframe={selectedTimeframe}
        viewTabs={viewTabs}
        timeframes={timeframes}
        setSelectedView={setSelectedView}
        setSelectedTimeframe={setSelectedTimeframe}
        setShowChallengeModal={setShowChallengeModal}
        setShowShareModal={setShowShareModal}
      />

      {/* Leaderboard List */}
      <ScrollView 
        style={styles.leaderboardContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.leaderboardContent,
          { paddingHorizontal: isTablet ? 40 : 20 }
        ]}
      >
        {/* Gamification Section */}
        <LeaderboardScreenGamification 
          currentUser={currentUser}
          badges={badges}
          challenges={challenges}
        />

        {/* Regular Leaderboard */}
        <LeaderboardScreenRankings 
          getCurrentData={getCurrentData}
          currentUser={currentUser}
          badges={badges}
          getChangeIcon={getChangeIcon}
          getChangeColor={getChangeColor}
        />
      </ScrollView>

      {/* Sticky User Position */}
      <LeaderboardScreenUserPosition 
        currentUser={currentUser}
        getTotalUsers={getTotalUsers}
        selectedTimeframe={selectedTimeframe}
        getNearbyCompetitors={getNearbyCompetitors}
      />

      {/* Modals */}
      <LeaderboardScreenModals 
        showChallengeModal={showChallengeModal}
        showShareModal={showShareModal}
        setShowChallengeModal={setShowChallengeModal}
        setShowShareModal={setShowShareModal}
        currentUser={currentUser}
        selectedView={selectedView}
        selectedTimeframe={selectedTimeframe}
      />
    </SafeAreaView>
  );
}
