import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioScreenStyles as styles } from '../../styles/PortfolioScreenStyles';

// Type definitions
interface PortfolioBreakdownItem {
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
  portfolioBreakdown: PortfolioBreakdownItem[];
  setShowStockModal: (show: boolean) => void;
  setShowRealEstateModal: (show: boolean) => void;
  setShowETFModal: (show: boolean) => void;
  setShowCryptoModal: (show: boolean) => void;
}

export default function PortfolioScreenBreakdown({
  portfolioBreakdown,
  setShowStockModal,
  setShowRealEstateModal,
  setShowETFModal,
  setShowCryptoModal
}: Props): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={[styles.breakdownCardsSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
      <Text style={[styles.sectionTitle, { fontSize: isTablet ? 24 : 20 }]}>
        Portfolio Breakdown
      </Text>
      <Text style={[styles.sectionSubtitle, { fontSize: isTablet ? 16 : 14 }]}>
        Tap any card to view details
      </Text>
      
      <View style={styles.cardsGrid}>
        {portfolioBreakdown.map((item) => {
          const isClickable = item.id === 'stocks' || item.id === 'real-estate' || item.id === 'etfs' || item.id === 'crypto';
          const handlePress = () => {
            if (item.id === 'stocks') {
              setShowStockModal(true);
            } else if (item.id === 'real-estate') {
              setShowRealEstateModal(true);
            } else if (item.id === 'etfs') {
              setShowETFModal(true);
            } else if (item.id === 'crypto') {
              setShowCryptoModal(true);
            }
          };
          
          const cardContent = (
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
          );
          
          const cardValue = (
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
          );

          return isClickable ? (
            <TouchableOpacity
              key={item.id}
              onPress={handlePress}
              style={[
                styles.breakdownCard,
                { 
                  backgroundColor: isAndroid ? '#fff' : item.backgroundColor,
                  borderColor: isAndroid ? 'transparent' : item.color,
                  borderWidth: isAndroid ? 0 : 1,
                  width: isTablet ? '48%' : '100%',
                  marginBottom: isTablet ? 16 : 12
                }
              ]}
            >
              {cardContent}
              {cardValue}
            </TouchableOpacity>
          ) : (
            <View
              key={item.id}
              style={[
                styles.breakdownCard,
                { 
                  backgroundColor: isAndroid ? '#fff' : item.backgroundColor,
                  borderColor: isAndroid ? 'transparent' : item.color,
                  borderWidth: isAndroid ? 0 : 1,
                  width: isTablet ? '48%' : '100%',
                  marginBottom: isTablet ? 16 : 12
                }
              ]}
            >
              {cardContent}
              {cardValue}
            </View>
          );
        })}
      </View>
    </View>
  );
}
