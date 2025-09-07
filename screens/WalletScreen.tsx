import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { walletScreenStyles as styles } from '../styles/WalletScreenStyles';

export default function WalletScreen(): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  // State for modals
  const [showWalletActions, setShowWalletActions] = useState(false);

  // Wallet overview data
  const walletOverview = {
    totalBalance: 5600,
    dailyChange: 15,
    dailyChangeAmount: 15,
    weeklyChange: 2.1,
    weeklyChangeAmount: 115,
    isPositive: true,
    availableCash: 3200,
    streak: 12,
    hasLoggedInToday: true
  };

  // Cash management breakdown
  const cashBreakdown = [
    {
      id: 'checking',
      title: 'Checking Account',
      icon: 'wallet',
      value: 3200,
      change: 0,
      type: 'cash',
      color: '#007AFF',
      backgroundColor: isAndroid ? '#fff' : 'rgba(0, 122, 255, 0.1)',
      description: 'Available for spending'
    },
    {
      id: 'savings',
      title: 'High-Yield Savings',
      icon: 'shield-checkmark',
      value: 2400,
      change: 0.15,
      type: 'savings',
      color: '#34C759',
      backgroundColor: isAndroid ? '#fff' : 'rgba(52, 199, 89, 0.1)',
      description: '4.5% APY compounding'
    },
    {
      id: 'student-debt',
      title: 'Student Loans',
      icon: 'school',
      value: -1800,
      change: -0.5,
      type: 'debt',
      color: '#FF3B30',
      backgroundColor: isAndroid ? '#fff' : 'rgba(255, 59, 48, 0.1)',
      description: '4.5% interest rate'
    },
    {
      id: 'credit-card',
      title: 'Credit Card',
      icon: 'card',
      value: -350,
      change: 0,
      type: 'debt',
      color: '#FF3B30',
      backgroundColor: isAndroid ? '#fff' : 'rgba(255, 59, 48, 0.1)',
      description: '18.9% APR if unpaid'
    },
    {
      id: 'emergency-fund',
      title: 'Emergency Fund',
      icon: 'medical',
      value: 1350,
      change: 0.2,
      type: 'savings',
      color: '#FF9500',
      backgroundColor: isAndroid ? '#fff' : 'rgba(255, 149, 0, 0.1)',
      description: 'Goal: 6 months expenses'
    }
  ];

  // Wallet actions
  const walletActions = [
    {
      id: 'save-money',
      title: 'Save Money',
      icon: 'shield-checkmark',
      color: '#34C759',
      description: 'Deposit into high-yield savings',
      subtitle: 'Watch compound interest work'
    },
    {
      id: 'take-loan',
      title: 'Take Loan',
      icon: 'card',
      color: '#FF9500',
      description: 'Borrow money with interest rates',
      subtitle: 'Learn about debt and leverage'
    },
    {
      id: 'pay-debt',
      title: 'Pay Off Debt',
      icon: 'checkmark-circle',
      color: '#007AFF',
      description: 'Reduce loans and credit cards',
      subtitle: 'Save on interest payments'
    },
    {
      id: 'budget',
      title: 'Create Budget',
      icon: 'pie-chart',
      color: '#8E4EC6',
      description: 'Track spending and savings goals',
      subtitle: 'Control your cash flow'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent, 
          { 
            paddingBottom: isTablet ? 40 : 20,
            paddingTop: isAndroid ? 20 : 0
          }
        ]}
      >
        {/* Wallet Overview Section */}
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

        {/* Cash Management Cards */}
        <View style={[styles.cashCardsSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
          <Text style={[styles.sectionTitle, { fontSize: isTablet ? 24 : 20 }]}>
            Cash Management
          </Text>
          <Text style={[styles.sectionSubtitle, { fontSize: isTablet ? 16 : 14 }]}>
            Track your money and debts
          </Text>
          
          <View style={styles.cardsGrid}>
            {cashBreakdown.map((item) => (
              <View 
                key={item.id} 
                style={[
                  styles.cashCard,
                  { 
                    backgroundColor: item.backgroundColor,
                    borderColor: isAndroid ? 'transparent' : item.color,
                    borderWidth: isAndroid ? 0 : 1,
                    width: isTablet ? '48%' : '100%',
                    marginBottom: isTablet ? 16 : 12
                  }
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={[styles.cardIconContainer, { backgroundColor: item.color }]}>
                    <Ionicons 
                      name={item.icon as any} 
                      size={isTablet ? 24 : 20} 
                      color="#fff" 
                    />
                  </View>
                  <View style={styles.cardHeaderText}>
                    <Text style={[styles.cardTitle, { fontSize: isTablet ? 18 : 16 }]}>
                      {item.title}
                    </Text>
                    <Text style={[styles.cardDescription, { fontSize: isTablet ? 14 : 12 }]}>
                      {item.description}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.cardContent}>
                  <Text style={[
                    styles.cardValue, 
                    { 
                      color: item.type === 'debt' ? item.color : '#1a1a1a',
                      fontSize: isTablet ? 28 : 24
                    }
                  ]}>
                    {item.value < 0 ? '-' : ''}${Math.abs(item.value).toLocaleString()}
                  </Text>
                  
                  {item.change !== 0 && (
                    <View style={styles.cardChangeContainer}>
                      <Ionicons 
                        name={item.change > 0 ? "arrow-up" : "arrow-down"} 
                        size={isTablet ? 16 : 14} 
                        color={item.change > 0 ? "#34C759" : "#FF3B30"} 
                      />
                      <Text style={[
                        styles.cardChange,
                        { 
                          color: item.change > 0 ? "#34C759" : "#FF3B30",
                          fontSize: isTablet ? 14 : 12
                        }
                      ]}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.floatingActionButton}
        onPress={() => setShowWalletActions(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Wallet Action Sheet Modal */}
      {showWalletActions && (
        <TouchableOpacity 
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setShowWalletActions(false)}
        >
          <View style={styles.actionSheetContainer}>
            <TouchableOpacity 
              style={styles.actionSheetHeader}
              activeOpacity={1}
            >
              <View style={styles.actionSheetHandle} />
              <Text style={styles.actionSheetTitle}>Wallet Actions</Text>
              <Text style={styles.actionSheetSubtitle}>
                Manage your money and debt
              </Text>
            </TouchableOpacity>

            <View style={styles.actionsGrid}>
              {walletActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => {
                    setShowWalletActions(false);
                    console.log(`Selected wallet action: ${action.title}`);
                  }}
                >
                  <View style={[styles.actionIconContainer, { backgroundColor: action.color }]}>
                    <Ionicons name={action.icon as any} size={24} color="#fff" />
                  </View>
                  <View style={styles.actionContent}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                    <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6b7280" />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowWalletActions(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
