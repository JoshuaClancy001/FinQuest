import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { homeScreenStyles as styles } from '../../styles/HomeScreenStyles';
import { User } from '../../types/user';

interface HomeScreenPortfolioProps {
  user: User | null;
  onPortfolioPress: () => void;
}

export default function HomeScreenPortfolio({ user, onPortfolioPress }: HomeScreenPortfolioProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  // Simple chart component
  const MiniChart = ({ data }: { data: number[] }) => {
    // Create simple trending data based on portfolio change direction
    const isPositive = user?.portfolio.totalChangeIsPositive;
    const chartData = isPositive 
      ? [5, 10, 15, 20, 25] // Increasing trend for positive
      : [25, 20, 15, 10, 5]; // Decreasing trend for negative
    
    return (
      <View style={styles.chartContainer}>
        {chartData.map((height, index) => {
          return (
            <View
              key={index}
              style={[
                styles.chartBar,
                {
                  height,
                  backgroundColor: isPositive ? '#34C759' : '#FF3B30'
                }
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.portfolioSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
      <TouchableOpacity 
        style={styles.portfolioCard}
        onPress={onPortfolioPress}
      >
        <View style={styles.portfolioHeader}>
          <View style={styles.portfolioInfo}>
            <Text style={styles.portfolioTitle}>Portfolio</Text>
            <Text style={styles.portfolioValue}>
              ${user?.portfolio.totalValue.toLocaleString()}
            </Text>
            <Text style={[
              styles.portfolioChange,
              user?.portfolio.totalChangeIsPositive ? styles.positiveChange : styles.negativeChange
            ]}>
              {user?.portfolio.totalChangeIsPositive ? '+' : ''}{isNaN(user?.portfolio.totalDailyChangePercent || 0) ? '0.0' : (user?.portfolio.totalDailyChangePercent || 0).toFixed(1)}% today
              {' '}({user?.portfolio.totalChangeIsPositive ? '+' : ''}${isNaN(user?.portfolio.totalDailyChangeAmount || 0) ? '0' : (user?.portfolio.totalDailyChangeAmount || 0).toFixed(0)})
            </Text>
          </View>
          <MiniChart data={[]} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
