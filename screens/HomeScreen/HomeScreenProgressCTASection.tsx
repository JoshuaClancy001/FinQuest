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

  // Progress and CTA logic
  const currentLevelXP = 1000; // XP required for current level
  const nextLevelXP = 1500; // XP required for next level
  const progressPercentage = (((user?.xp ?? 0) - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  
  const levelNames = [
    'Beginner',
    'Budget Rookie',
    'Smart Saver',
    'Investor Novice',
    'Financial Guru',
    'Money Master'
  ];

  const currentLevelName = levelNames[user?.level! - 1] || 'Budget Rookie';
  const nextLevelName = levelNames[user?.level!] || 'Smart Saver';

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
          <Text style={styles.xpText}>{user?.xp}/{nextLevelXP} XP</Text>
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
