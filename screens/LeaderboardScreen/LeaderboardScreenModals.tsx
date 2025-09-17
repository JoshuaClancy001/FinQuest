import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { leaderboardScreenStyles as styles } from '../../styles/LeaderboardScreenStyles';

// Types
type LeaderboardView = 'friends' | 'forbes';
type TimeframePeriod = 'daily' | 'weekly' | 'alltime';

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

interface FriendChallengeTemplate {
  id: string;
  title: string;
  description: string;
  goal: string;
  timeframe: string;
  icon: string;
  reward: string;
}

interface ShareableRank {
  message: string;
  hashtags: string;
  stats: string;
}

interface LeaderboardScreenModalsProps {
  showChallengeModal: boolean;
  showShareModal: boolean;
  setShowChallengeModal: (show: boolean) => void;
  setShowShareModal: (show: boolean) => void;
  currentUser: CurrentUser;
  selectedView: LeaderboardView;
  selectedTimeframe: TimeframePeriod;
}

export default function LeaderboardScreenModals({
  showChallengeModal,
  showShareModal,
  setShowChallengeModal,
  setShowShareModal,
  currentUser,
  selectedView,
  selectedTimeframe
}: LeaderboardScreenModalsProps): React.JSX.Element {

  const friendChallengeTemplates: FriendChallengeTemplate[] = [
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

  const getShareableRank = (): ShareableRank => {
    const viewNames = {
      forbes: 'Wealth Leaders',
      friends: 'your friend circle'
    };
    
    const timeframes = {
      daily: 'today',
      weekly: 'this week',
      alltime: 'all-time'
    };

    return {
      message: `You are #${currentUser.rank} in ${viewNames[selectedView]} ${timeframes[selectedTimeframe]} 🔥`,
      hashtags: '#FinanceQuest #LearnFinance #MoneyGoals',
      stats: `Level ${currentUser.level} • $${currentUser.netWorth.toLocaleString()} Net Worth • ${currentUser.xp.toLocaleString()} XP`
    };
  };

  return (
    <>
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
    </>
  );
}
