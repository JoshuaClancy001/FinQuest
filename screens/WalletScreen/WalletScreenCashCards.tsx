import React from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { walletScreenStyles as styles } from '../../styles/WalletScreenStyles';

// Type definitions
interface CashBreakdownItem {
  id: string;
  title: string;
  icon: string;
  value: number;
  change: number;
  type: string;
  color: string;
  backgroundColor: string;
  description: string;
}

interface Props {
  cashBreakdown: CashBreakdownItem[];
}

export default function WalletScreenCashCards({ cashBreakdown }: Props): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  return (
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
  );
}
