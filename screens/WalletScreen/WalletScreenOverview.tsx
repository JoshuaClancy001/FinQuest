import React from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { walletScreenStyles as styles } from '../../styles/WalletScreenStyles';

// Type definitions
interface WalletOverviewData {
  totalBalance: number;
  dailyChange: number;
  dailyChangeAmount: number;
  weeklyChange: number;
  weeklyChangeAmount: number;
  isPositive: boolean;
  availableCash: number;
  streak: number;
  hasLoggedInToday: boolean;
}

interface Props {
  walletOverview: WalletOverviewData;
}

export default function WalletScreenOverview({ walletOverview }: Props): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={[
      styles.walletOverviewSection, 
      { 
        paddingHorizontal: isTablet ? 40 : 20,
        marginTop: isAndroid ? 10 : 0
      }
    ]}>
      <View style={styles.walletOverviewHeader}>
        <Text style={[styles.walletOverviewTitle, { fontSize: isTablet ? 32 : 28 }]}>
          Wallet & Cash
        </Text>
        <View style={styles.gamificationControls}>
          {walletOverview.hasLoggedInToday && (
            <View style={styles.streakBadge}>
              <Ionicons name="flame" size={isTablet ? 20 : 16} color="#fff" />
              <Text style={[styles.streakText, { fontSize: isTablet ? 14 : 12 }]}>
                {walletOverview.streak}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cashBalanceContainer}>
        <View style={styles.cashBalanceCard}>
          <View style={styles.cashBalanceHeader}>
            <View style={styles.cashBalanceIconContainer}>
              <Ionicons name="wallet" size={isTablet ? 28 : 24} color="#fff" />
            </View>
            <View style={styles.cashBalanceInfo}>
              <Text style={[styles.cashBalanceLabel, { fontSize: isTablet ? 18 : 16 }]}>
                Total Cash Balance
              </Text>
              <Text style={[styles.cashBalanceValue, { fontSize: isTablet ? 42 : 36 }]}>
                ${walletOverview.totalBalance.toLocaleString()}
              </Text>
            </View>
          </View>
          
          {/* Available Cash Display */}
          <View style={styles.availableCash}>
            <Text style={styles.availableCashLabel}>Available to Spend</Text>
            <Text style={styles.availableCashValue}>
              ${walletOverview.availableCash.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.changeIndicators}>
        {/* Daily Change */}
        <View style={styles.changeItem}>
          <View style={styles.changeHeader}>
            <Ionicons 
              name={walletOverview.isPositive ? "trending-up" : "trending-down"} 
              size={isTablet ? 24 : 20} 
              color={walletOverview.isPositive ? "#34C759" : "#FF3B30"} 
            />
            <Text style={[styles.changeLabel, { fontSize: isTablet ? 14 : 12 }]}>
              Daily Change
            </Text>
          </View>
          <View style={[styles.changeValueContainer, {
            backgroundColor: walletOverview.isPositive ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)'
          }]}>
            <Text style={[
              styles.changeValue,
              { 
                color: walletOverview.isPositive ? "#34C759" : "#FF3B30",
                fontSize: isTablet ? 18 : 16
              }
            ]}>
              {walletOverview.isPositive ? '+' : ''}${walletOverview.dailyChangeAmount}
            </Text>
          </View>
        </View>

        {/* Weekly Change */}
        <View style={styles.changeItem}>
          <View style={styles.changeHeader}>
            <Ionicons 
              name={walletOverview.weeklyChange >= 0 ? "trending-up" : "trending-down"} 
              size={isTablet ? 24 : 20} 
              color={walletOverview.weeklyChange >= 0 ? "#34C759" : "#FF3B30"} 
            />
            <Text style={[styles.changeLabel, { fontSize: isTablet ? 14 : 12 }]}>
              Weekly Change
            </Text>
          </View>
          <View style={[styles.changeValueContainer, {
            backgroundColor: walletOverview.weeklyChange >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)'
          }]}>
            <Text style={[
              styles.changeValue,
              { 
                color: walletOverview.weeklyChange >= 0 ? "#34C759" : "#FF3B30",
                fontSize: isTablet ? 18 : 16
              }
            ]}>
              {walletOverview.weeklyChange >= 0 ? '+' : ''}${walletOverview.weeklyChangeAmount}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
