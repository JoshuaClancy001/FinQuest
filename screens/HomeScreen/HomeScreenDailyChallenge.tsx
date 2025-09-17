import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeScreenStyles as styles } from '../../styles/HomeScreenStyles';
import { DailyQuest } from '../../types';

interface HomeScreenDailyChallengeProps {
  todaysQuest: DailyQuest;
  onChallengePress: () => void;
}

export default function HomeScreenDailyChallenge({ todaysQuest, onChallengePress }: HomeScreenDailyChallengeProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  return (
    <View style={[styles.questSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
      <Text style={styles.questSectionTitle}>Daily Challenge</Text>
      <TouchableOpacity 
        style={[styles.questCard, { borderLeftColor: "#007AFF" }]}
        onPress={onChallengePress}
      >
        <View style={styles.questHeader}>
          <View style={[styles.questIconContainer, { backgroundColor: "#007AFF" }]}>
            <Ionicons name="flash" size={20} color="#fff" />
          </View>
          <View style={styles.questReward}>
            <Ionicons name="logo-bitcoin" size={14} color="#FFD700" />
            <Text style={styles.questRewardText}>+{todaysQuest.reward}</Text>
          </View>
        </View>
        <Text style={styles.questTitle}>Daily Challenge</Text>
        <Text style={styles.questDescription}>Test your financial skills in a real-world scenario!</Text>
        <View style={styles.questAction}>
          <Text style={[styles.questActionText, { color: "#007AFF" }]}>
            Start Challenge →
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
