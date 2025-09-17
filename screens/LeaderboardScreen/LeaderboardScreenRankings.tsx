import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { leaderboardScreenStyles as styles } from '../../styles/LeaderboardScreenStyles';

// Types
interface Player {
  id: string;
  name: string;
  avatar: string;
  netWorth: number;
  rank: number;
  change: string;
  level: number;
  xp: number;
  isYou: boolean;
}

interface Badge {
  name: string;
  icon: string;
  color: string;
  description: string;
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

interface LeaderboardScreenRankingsProps {
  getCurrentData: () => Player[];
  currentUser: CurrentUser;
  badges: Record<string, Badge>;
  getChangeIcon: (change: string) => string;
  getChangeColor: (change: string) => string;
}

export default function LeaderboardScreenRankings({
  getCurrentData,
  currentUser,
  badges,
  getChangeIcon,
  getChangeColor
}: LeaderboardScreenRankingsProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  return (
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
                      {currentUser.badges.slice(0, 2).map((badgeId) => {
                        const badge = badges[badgeId];
                        if (!badge) return null; // Safety check for unknown badge IDs
                        return (
                          <Text key={badgeId} style={styles.miniBadge}>
                            {badge.icon}
                          </Text>
                        );
                      })}
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
              name={getChangeIcon(player.change) as any} 
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
  );
}
