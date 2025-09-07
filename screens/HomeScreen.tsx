import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile, PortfolioData, DailyQuest, LeaderboardData } from '../types';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyles';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation();
  
  // Get screen dimensions for responsive sizing
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  
  // Hard-coded data for now - using the TypeScript interface
  const userProfile: UserProfile = {
    id: '1',
    name: 'John Doe',
    initials: 'JD',
    coins: 2450,
    streak: 7,
    level: 5,
    xp: 1250,
  };

  // Portfolio data (hard-coded for now)
  const portfolioData: PortfolioData = {
    totalValue: 5200,
    dailyChange: 1.2,
    dailyChangeAmount: 62,
    isPositive: true,
    chartData: [4800, 4950, 5100, 5050, 5200] // Simple trend data
  };

  // Daily Quest/Scenario data (hard-coded for now)
  const dailyQuests: DailyQuest[] = [
    {
      id: 1,
      title: "Emergency Challenge",
      description: "Can you survive a $300 car repair?",
      icon: "car" as keyof typeof Ionicons.glyphMap,
      color: "#FF6B35",
      reward: 150,
      type: "scenario"
    },
    {
      id: 2,
      title: "Market Opportunity",
      description: "Try investing your coins today — the market is moving.",
      icon: "trending-up" as keyof typeof Ionicons.glyphMap,
      color: "#34C759",
      reward: 200,
      type: "investment"
    },
    {
      id: 3,
      title: "Learning Streak",
      description: "Finish 1 lesson to unlock +200 coins!",
      icon: "school" as keyof typeof Ionicons.glyphMap,
      color: "#007AFF",
      reward: 200,
      type: "lesson"
    },
    {
      id: 4,
      title: "Budget Master",
      description: "Set up your first monthly budget and earn rewards!",
      icon: "calculator" as keyof typeof Ionicons.glyphMap,
      color: "#AF52DE",
      reward: 250,
      type: "budget"
    },
    {
      id: 5,
      title: "Savings Goal",
      description: "Save 500 coins for your emergency fund today!",
      icon: "shield-checkmark" as keyof typeof Ionicons.glyphMap,
      color: "#FF9500",
      reward: 100,
      type: "savings"
    }
  ];

  // Select today's quest based on date (pseudo-random but consistent per day)
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const todaysQuest = dailyQuests[dayOfYear % dailyQuests.length];

  // Leaderboard data (hard-coded for now)
  const leaderboardData: LeaderboardData = {
    userRank: 7,
    totalUsers: 1247,
    weeklyRank: 7,
    friendsAhead: 3,
    friendsNames: ['Sarah', 'Mike', 'Alex'],
    pointsToNext: 85,
    weeklyPoints: 1240
  };

  // Progress and CTA logic
  const currentLevelXP = 1000; // XP required for current level
  const nextLevelXP = 1500; // XP required for next level
  const progressPercentage = ((userProfile.xp! - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  
  const levelNames = [
    'Beginner',
    'Budget Rookie',
    'Smart Saver',
    'Investor Novice',
    'Financial Guru',
    'Money Master'
  ];

  const currentLevelName = levelNames[userProfile.level! - 1] || 'Budget Rookie';
  const nextLevelName = levelNames[userProfile.level!] || 'Smart Saver';

  // CTA button logic (hard-coded for now)
  const hasUnfinishedLesson = true;
  const hasDailyQuest = false;
  const hasRewardToCollect = false;

  const getCTAContent = () => {
    if (hasUnfinishedLesson) {
      return {
        text: 'Continue Lesson',
        icon: 'play-circle' as keyof typeof Ionicons.glyphMap,
        color: '#007AFF'
      };
    } else if (hasDailyQuest) {
      return {
        text: 'Complete Daily Challenge',
        icon: 'trophy' as keyof typeof Ionicons.glyphMap,
        color: '#FF6B35'
      };
    } else if (hasRewardToCollect) {
      return {
        text: 'Collect Reward',
        icon: 'gift' as keyof typeof Ionicons.glyphMap,
        color: '#34C759'
      };
    } else {
      return {
        text: 'Start Learning',
        icon: 'book' as keyof typeof Ionicons.glyphMap,
        color: '#007AFF'
      };
    }
  };

  const ctaContent = getCTAContent();

  // Simple chart component
  const MiniChart = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    return (
      <View style={styles.chartContainer}>
        {data.map((value, index) => {
          const height = range === 0 ? 20 : ((value - min) / range) * 20 + 5;
          return (
            <View
              key={index}
              style={[
                styles.chartBar,
                {
                  height,
                  backgroundColor: portfolioData.isPositive ? '#34C759' : '#FF3B30'
                }
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: isTablet ? 40 : 20 }]}
      >
        {/* Header/Status Bar */}
        <View style={[styles.header, { paddingHorizontal: isTablet ? 40 : 20 }]}>
        {/* Left side - Avatar and greeting */}
        <View style={styles.leftSection}>
          <View style={[
            styles.avatarContainer,
            { 
              width: isTablet ? 60 : 50,
              height: isTablet ? 60 : 50,
              borderRadius: isTablet ? 30 : 25
            }
          ]}>
            <Text style={[
              styles.avatarText,
              { fontSize: isTablet ? 22 : 18 }
            ]}>{userProfile.initials}</Text>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={[
              styles.greetingText,
              { fontSize: isTablet ? 16 : 14 }
            ]}>Welcome back,</Text>
            <Text style={[
              styles.nameText,
              { fontSize: isTablet ? 18 : 16 }
            ]}>{userProfile.name}</Text>
          </View>
        </View>

        {/* Right side - Stats and notification */}
        <View style={styles.rightSection}>
          {/* Coins */}
          <View style={styles.statItem}>
            <Ionicons name="logo-bitcoin" size={16} color="#FFD700" />
            <Text style={styles.statValue}>{userProfile.coins.toLocaleString()}</Text>
          </View>
          
          {/* Streak */}
          <View style={styles.statItem}>
            <Ionicons name="flame" size={16} color="#FF6B35" />
            <Text style={styles.statValue}>{userProfile.streak}</Text>
          </View>
          
          {/* Notification Bell */}
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Progress & CTA Section */}
      <View style={[styles.progressSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Level Progress</Text>
          <View style={styles.levelInfo}>
            <Text style={styles.levelText}>{currentLevelName}</Text>
            <Text style={styles.xpText}>{userProfile.xp}/{nextLevelXP} XP</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${Math.min(progressPercentage, 100)}%` }
                ]} 
              />
            </View>
          </View>
          <Text style={styles.nextLevelText}>→ {nextLevelName}</Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={[
          styles.ctaButton, 
          { 
            backgroundColor: ctaContent.color,
            paddingVertical: isTablet ? 20 : 16,
            paddingHorizontal: isTablet ? 32 : 24
          }
        ]}>
          <Ionicons name={ctaContent.icon} size={isTablet ? 28 : 24} color="#fff" />
          <Text style={[
            styles.ctaButtonText,
            { fontSize: isTablet ? 20 : 18 }
          ]}>{ctaContent.text}</Text>
        </TouchableOpacity>
      </View>

      {/* Portfolio Snapshot */}
      <View style={[styles.portfolioSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
        <TouchableOpacity 
          style={styles.portfolioCard}
          onPress={() => navigation.navigate('Portfolio' as never)}
        >
          <View style={styles.portfolioHeader}>
            <View style={styles.portfolioInfo}>
              <Text style={styles.portfolioTitle}>Portfolio</Text>
              <Text style={styles.portfolioValue}>
                ${portfolioData.totalValue.toLocaleString()}
              </Text>
              <Text style={[
                styles.portfolioChange,
                portfolioData.isPositive ? styles.positiveChange : styles.negativeChange
              ]}>
                {portfolioData.isPositive ? '+' : ''}{portfolioData.dailyChange}% today
                {' '}({portfolioData.isPositive ? '+' : ''}${portfolioData.dailyChangeAmount})
              </Text>
            </View>
            <MiniChart data={portfolioData.chartData} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Daily Quest / Scenario */}
      <View style={[styles.questSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
        <Text style={styles.questSectionTitle}>Daily Challenge</Text>
        <TouchableOpacity style={[styles.questCard, { borderLeftColor: todaysQuest.color }]}>
          <View style={styles.questHeader}>
            <View style={[styles.questIconContainer, { backgroundColor: todaysQuest.color }]}>
              <Ionicons name={todaysQuest.icon} size={20} color="#fff" />
            </View>
            <View style={styles.questReward}>
              <Ionicons name="logo-bitcoin" size={14} color="#FFD700" />
              <Text style={styles.questRewardText}>+{todaysQuest.reward}</Text>
            </View>
          </View>
          <Text style={styles.questTitle}>{todaysQuest.title}</Text>
          <Text style={styles.questDescription}>{todaysQuest.description}</Text>
          <View style={styles.questAction}>
            <Text style={[styles.questActionText, { color: todaysQuest.color }]}>
              Start Challenge →
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Leaderboard Teaser */}
      <View style={[styles.leaderboardSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
        <TouchableOpacity 
          style={styles.leaderboardCard}
          onPress={() => navigation.navigate('Leaderboard' as never)}
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
      </ScrollView>
    </SafeAreaView>
  );
}
