import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { walletScreenStyles as styles } from '../../styles/WalletScreenStyles';

// Type definitions
interface WalletAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  subtitle: string;
}

interface Props {
  showWalletActions: boolean;
  setShowWalletActions: (show: boolean) => void;
  walletActions: WalletAction[];
}

export default function WalletScreenModals({
  showWalletActions,
  setShowWalletActions,
  walletActions
}: Props): React.JSX.Element | null {
  if (!showWalletActions) {
    return null;
  }

  return (
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
  );
}
