import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { walletScreenStyles as styles } from '../../styles/WalletScreenStyles';
import WalletScreenOverview from './WalletScreenOverview';
import WalletScreenCashCards from './WalletScreenCashCards';
import WalletScreenModals from './WalletScreenModals';

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
        <WalletScreenOverview walletOverview={walletOverview} />

        {/* Cash Management Cards */}
        <WalletScreenCashCards cashBreakdown={cashBreakdown} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.floatingActionButton}
        onPress={() => setShowWalletActions(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Wallet Modals */}
      <WalletScreenModals
        showWalletActions={showWalletActions}
        setShowWalletActions={setShowWalletActions}
        walletActions={walletActions}
      />
    </SafeAreaView>
  );
}
