import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeScreenStyles as styles } from '../../styles/HomeScreenStyles';
import { User } from '../../types/user';

interface ProgressCTASectionProps {
  user: User | null;
  onCTAPress: () => void;
}

export default function HomeScreenProgressCTASection({ user, onCTAPress }: ProgressCTASectionProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  // Progress and CTA logic - New 10 Level System
  const getCorrectLevelFromXP = (xp: number) => {
    if (xp <= 1000) return 1;
    if (xp <= 2500) return 2;
    if (xp <= 5000) return 3;
    if (xp <= 10000) return 4;
    if (xp <= 20000) return 5;
    if (xp <= 50000) return 6;
    if (xp <= 100000) return 7;
    if (xp <= 200000) return 8;
    if (xp <= 500000) return 9;
    return 10;
  };

  const getLevelXPThresholds = (level: number) => {
    // XP thresholds for each level (0-based indexing)
    // Level 1: 0-1,000, Level 2: 1,001-2,500, etc.
    const levelRanges = [
      { min: 0, max: 1000 },           // Level 1
      { min: 1001, max: 2500 },        // Level 2  
      { min: 2501, max: 5000 },        // Level 3
      { min: 5001, max: 10000 },       // Level 4
      { min: 10001, max: 20000 },      // Level 5
      { min: 20001, max: 50000 },      // Level 6
      { min: 50001, max: 100000 },     // Level 7
      { min: 100001, max: 200000 },    // Level 8
      { min: 200001, max: 500000 },    // Level 9
      { min: 500001, max: 1000000 }    // Level 10
    ];
    
    const currentLevel = Math.max(1, Math.min(10, level)); // Clamp between 1-10
    const currentRange = levelRanges[currentLevel - 1];
    
    return {
      currentLevelStart: currentRange.min,
      nextLevelStart: currentRange.max + 1, // Next level starts at max + 1
      currentLevelMax: currentRange.max
    };
  };

  // Use the correct level based on XP, not the stored level
  const userXP = user?.xp ?? 0;
  const correctLevel = getCorrectLevelFromXP(userXP);
  const { currentLevelStart, nextLevelStart, currentLevelMax } = getLevelXPThresholds(correctLevel);
  const progressPercentage = ((userXP - currentLevelStart) / (currentLevelMax - currentLevelStart)) * 100;

  // Debug logging
  console.log('Level Progress Debug:', {
    userXP,
    storedLevel: user?.level,
    correctLevel,
    currentLevelStart,
    currentLevelMax,
    progressPercentage: Math.max(0, Math.min(100, progressPercentage)).toFixed(1) + '%'
  });
  
  const levelNames = [
    'Beginner',
    'Budget Rookie', 
    'Smart Saver',
    'Investor Novice',
    'Financial Guru',
    'Money Master',
    'Wealth Builder',
    'Investment Expert',
    'Financial Titan',
    'Money Mogul'
  ];

  const currentLevelName = levelNames[correctLevel - 1] || 'Beginner';
  const nextLevelName = levelNames[correctLevel] || 'Max Level';

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

  return (
    <View style={[styles.progressSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Level Progress</Text>
        <View style={styles.levelInfo}>
          <Text style={styles.levelText}>{currentLevelName}</Text>
          <Text style={styles.xpText}>{user?.xp}/{currentLevelMax} XP</Text>
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
      <TouchableOpacity 
        style={[
          styles.ctaButton, 
          { 
            backgroundColor: ctaContent.color,
            paddingVertical: isTablet ? 20 : 16,
            paddingHorizontal: isTablet ? 32 : 24
          }
        ]}
        onPress={onCTAPress}
      >
        <Ionicons name={ctaContent.icon} size={isTablet ? 28 : 24} color="#fff" />
        <Text style={[
          styles.ctaButtonText,
          { fontSize: isTablet ? 20 : 18 }
        ]}>{ctaContent.text}</Text>
      </TouchableOpacity>
    </View>
  );
}
