import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { portfolioScreenStyles as styles } from '../styles/PortfolioScreenStyles';

export default function PortfolioScreen(): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  // Portfolio overview data (hard-coded for now)
  const portfolioOverview = {
    netWorth: 15750,
    dailyChange: 2.4,
    dailyChangeAmount: 380,
    weeklyChange: -1.2,
    weeklyChangeAmount: -190,
    isPositive: true,
    streak: 12,
    hasLoggedInToday: true,
    assets: {
      stocks: 5200,
      etfs: 3750,
      realEstate: 3600,
      crypto: 1200,
      bonds: 2000
    }
  };

  // Portfolio breakdown data for investment cards only
  const portfolioBreakdown = [
    {
      id: 'stocks',
      title: 'Individual Stocks',
      icon: 'trending-up',
      value: 5200,
      change: 3.2,
      type: 'investment',
      color: '#34C759',
      backgroundColor: isAndroid ? '#fff' : 'rgba(52, 199, 89, 0.1)',
      description: 'Apple, Microsoft, Tesla'
    },
    {
      id: 'etfs',
      title: 'ETFs & Index Funds',
      icon: 'bar-chart',
      value: 3750,
      change: 1.8,
      type: 'investment',
      color: '#007AFF',
      backgroundColor: isAndroid ? '#fff' : 'rgba(0, 122, 255, 0.1)',
      description: 'S&P 500, Total Market'
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      icon: 'home',
      value: 3600,
      change: 1.2,
      type: 'investment',
      color: '#FF9500',
      backgroundColor: isAndroid ? '#fff' : 'rgba(255, 149, 0, 0.1)',
      description: 'REITs & Property shares'
    },
    {
      id: 'crypto',
      title: 'Cryptocurrency',
      icon: 'logo-bitcoin',
      value: 1200,
      change: -4.5,
      type: 'investment',
      color: '#8E4EC6',
      backgroundColor: isAndroid ? '#fff' : 'rgba(142, 78, 198, 0.1)',
      description: 'Bitcoin, Ethereum'
    },
    {
      id: 'bonds',
      title: 'Bonds & Treasury',
      icon: 'shield-checkmark',
      value: 2000,
      change: 0.5,
      type: 'investment',
      color: '#00C7BE',
      backgroundColor: isAndroid ? '#fff' : 'rgba(0, 199, 190, 0.1)',
      description: 'Government & Corporate'
    }
  ];

  // Wealth growth data (last 8 weeks)
  const wealthGrowthData = [
    { week: 'Week 1', value: 12500 },
    { week: 'Week 2', value: 13200 },
    { week: 'Week 3', value: 13800 },
    { week: 'Week 4', value: 14100 },
    { week: 'Week 5', value: 14700 },
    { week: 'Week 6', value: 15200 },
    { week: 'Week 7', value: 15400 },
    { week: 'Week 8', value: 15750 },
  ];

  // Investment allocation data for pie chart - Investment focused
  const allocationData = [
    {
      id: 'stocks',
      label: 'Individual Stocks',
      percentage: 33,
      value: 5200,
      color: '#34C759',
      explanation: 'Individual stocks give you direct ownership in companies. Higher risk but potentially higher returns. Research companies before investing.'
    },
    {
      id: 'etfs',
      label: 'ETFs & Index Funds',
      percentage: 24,
      value: 3750,
      color: '#007AFF',
      explanation: 'ETFs provide instant diversification across hundreds of stocks. Lower risk than individual stocks and great for beginners.'
    },
    {
      id: 'realestate',
      label: 'Real Estate',
      percentage: 23,
      value: 3600,
      color: '#FF9500',
      explanation: 'Real estate investment through REITs provides exposure to property markets without buying physical real estate.'
    },
    {
      id: 'bonds',
      label: 'Bonds & Treasury',
      percentage: 13,
      value: 2000,
      color: '#00C7BE',
      explanation: 'Bonds provide steady income and stability to your portfolio. Government bonds are very safe but offer lower returns.'
    },
    {
      id: 'crypto',
      label: 'Cryptocurrency',
      percentage: 7,
      value: 1200,
      color: '#8E4EC6',
      explanation: 'Crypto is highly volatile and speculative. Only invest what you can afford to lose. Consider it a small part of your portfolio.'
    }
  ];

  // State for selected chart view and pie slice
  const [selectedTimeframe, setSelectedTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showMarketEvent, setShowMarketEvent] = useState(false);

  // Achievements data
  const achievements = [
    {
      id: 'first_investment',
      title: 'First $1,000 Invested!',
      description: 'You took your first step into investing',
      icon: 'trending-up',
      color: '#34C759',
      unlocked: true,
      progress: 100,
      reward: '+50 XP'
    },
    {
      id: 'loan_payoff',
      title: 'Debt Free!',
      description: 'Paid off your first loan completely',
      icon: 'checkmark-circle',
      color: '#007AFF',
      unlocked: true,
      progress: 100,
      reward: '+75 XP'
    },
    {
      id: 'diversified_portfolio',
      title: 'Portfolio Diversified',
      description: 'Invested in 3+ different asset classes',
      icon: 'pie-chart',
      color: '#FF9500',
      unlocked: true,
      progress: 100,
      reward: '+100 XP'
    },
    {
      id: 'emergency_fund',
      title: 'Emergency Fund Builder',
      description: 'Save 6 months of expenses',
      icon: 'shield-checkmark',
      color: '#00C7BE',
      unlocked: false,
      progress: 60,
      reward: '+150 XP'
    },
    {
      id: 'high_roller',
      title: 'High Roller',
      description: 'Reach $50,000 net worth',
      icon: 'diamond',
      color: '#8E4EC6',
      unlocked: false,
      progress: 31,
      reward: '+200 XP'
    }
  ];

  // Leaderboard data
  const leaderboardData = [
    { rank: 1, name: 'Alex Chen', netWorth: 47250, you: false },
    { rank: 2, name: 'Sarah Kim', netWorth: 32100, you: false },
    { rank: 3, name: 'You', netWorth: 15750, you: true },
    { rank: 4, name: 'Mike Johnson', netWorth: 12900, you: false },
    { rank: 5, name: 'Emma Davis', netWorth: 8600, you: false },
  ];

  // Market event simulation
  const marketEvents = [
    {
      type: 'crash',
      title: 'Market Crash!',
      description: 'Stocks are down 15% today due to economic uncertainty',
      impact: '-15%',
      color: '#FF3B30',
      icon: 'trending-down',
      decision: 'Do you want to sell, hold, or buy more?'
    },
    {
      type: 'boom',
      title: 'Market Rally!',
      description: 'Tech stocks surge 12% on positive earnings reports',
      impact: '+12%',
      color: '#34C759',
      icon: 'trending-up',
      decision: 'Perfect time to take profits or keep riding the wave?'
    },
    {
      type: 'rate_change',
      title: 'Fed Rate Cut!',
      description: 'Interest rates dropped 0.5%, affecting savings and loans',
      impact: 'Rates ↓',
      color: '#007AFF',
      icon: 'card',
      decision: 'Refinance loans or adjust savings strategy?'
    }
  ];

  const currentEvent = marketEvents[0]; // For demo purposes

  // Portfolio actions data - Investment focused only
  const portfolioActions = [
    {
      id: 'invest',
      title: 'Invest Money',
      icon: 'trending-up',
      color: '#34C759',
      description: 'Buy stocks, ETFs, or crypto',
      subtitle: 'Grow your wealth through the market'
    },
    {
      id: 'buy-assets',
      title: 'Buy Real Estate',
      icon: 'home',
      color: '#FF9500',
      description: 'Purchase REITs or property shares',
      subtitle: 'Build long-term wealth with real estate'
    },
    {
      id: 'rebalance',
      title: 'Rebalance Portfolio',
      icon: 'pie-chart',
      color: '#007AFF',
      description: 'Adjust your asset allocation',
      subtitle: 'Maintain optimal diversification'
    },
    {
      id: 'research',
      title: 'Research Investments',
      icon: 'search',
      color: '#8E4EC6',
      description: 'Analyze stocks and market trends',
      subtitle: 'Make informed investment decisions'
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
            paddingTop: isAndroid ? 20 : 0  // Extra padding for Android
          }
        ]}
      >
        {/* Overview Section */}
        <View style={[
          styles.overviewSection, 
          { 
            paddingHorizontal: isTablet ? 40 : 20,
            marginTop: isAndroid ? 10 : 0  // Additional margin for Android
          }
        ]}>
          <View style={styles.overviewHeader}>
            <Text style={[styles.overviewTitle, { fontSize: isTablet ? 32 : 28 }]}>
              Portfolio Overview
            </Text>
            <View style={styles.gamificationControls}>
              {portfolioOverview.hasLoggedInToday && (
                <View style={styles.streakBadge}>
                  <Ionicons name="flame" size={isTablet ? 20 : 16} color="#fff" />
                  <Text style={[styles.streakText, { fontSize: isTablet ? 14 : 12 }]}>
                    {portfolioOverview.streak}
                  </Text>
                </View>
              )}
              <TouchableOpacity 
                style={styles.achievementButton}
                onPress={() => setShowAchievements(true)}
              >
                <Ionicons name="trophy" size={isTablet ? 20 : 18} color="#FFD700" />
                <Text style={styles.achievementCount}>
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.netWorthContainer}>
            <View style={styles.netWorthCard}>
              <View style={styles.netWorthHeader}>
                <View style={styles.netWorthIconContainer}>
                  <Ionicons name="trending-up" size={isTablet ? 28 : 24} color="#fff" />
                </View>
                <View style={styles.netWorthInfo}>
                  <Text style={[styles.netWorthLabel, { fontSize: isTablet ? 18 : 16 }]}>
                    Total Net Worth
                  </Text>
                  <Text style={[styles.netWorthValue, { fontSize: isTablet ? 42 : 36 }]}>
                    ${portfolioOverview.netWorth.toLocaleString()}
                  </Text>
                </View>
              </View>
              
              {/* Mini Portfolio Breakdown */}
              <View style={styles.portfolioBreakdown}>
                <View style={styles.breakdownItem}>
                  <View style={[styles.breakdownDot, { backgroundColor: '#34C759' }]} />
                  <Text style={styles.breakdownLabel}>Stocks</Text>
                  <Text style={styles.breakdownValue}>${portfolioOverview.assets.stocks.toLocaleString()}</Text>
                </View>
                <View style={styles.breakdownItem}>
                  <View style={[styles.breakdownDot, { backgroundColor: '#007AFF' }]} />
                  <Text style={styles.breakdownLabel}>ETFs</Text>
                  <Text style={styles.breakdownValue}>${portfolioOverview.assets.etfs.toLocaleString()}</Text>
                </View>
                <View style={styles.breakdownItem}>
                  <View style={[styles.breakdownDot, { backgroundColor: '#FF9500' }]} />
                  <Text style={styles.breakdownLabel}>Real Estate</Text>
                  <Text style={styles.breakdownValue}>${portfolioOverview.assets.realEstate.toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.changeIndicators}>
            {/* Daily Change */}
            <View style={styles.changeItem}>
              <View style={styles.changeHeader}>
                <Ionicons 
                  name={portfolioOverview.isPositive ? "trending-up" : "trending-down"} 
                  size={isTablet ? 24 : 20} 
                  color={portfolioOverview.isPositive ? "#34C759" : "#FF3B30"} 
                />
                <Text style={[styles.changeLabel, { fontSize: isTablet ? 14 : 12 }]}>
                  Daily Change
                </Text>
              </View>
              <View style={[styles.changeValueContainer, {
                backgroundColor: portfolioOverview.isPositive ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)'
              }]}>
                <Text style={[
                  styles.changeValue,
                  { 
                    color: portfolioOverview.isPositive ? "#34C759" : "#FF3B30",
                    fontSize: isTablet ? 18 : 16
                  }
                ]}>
                  {portfolioOverview.isPositive ? '+' : ''}{portfolioOverview.dailyChange}%
                </Text>
                <Text style={[
                  styles.changeAmount,
                  { 
                    color: portfolioOverview.isPositive ? "#34C759" : "#FF3B30",
                    fontSize: isTablet ? 14 : 12
                  }
                ]}>
                  ({portfolioOverview.isPositive ? '+' : ''}${portfolioOverview.dailyChangeAmount})
                </Text>
              </View>
            </View>

            {/* Weekly Change */}
            <View style={styles.changeItem}>
              <View style={styles.changeHeader}>
                <Ionicons 
                  name={portfolioOverview.weeklyChange >= 0 ? "trending-up" : "trending-down"} 
                  size={isTablet ? 24 : 20} 
                  color={portfolioOverview.weeklyChange >= 0 ? "#34C759" : "#FF3B30"} 
                />
                <Text style={[styles.changeLabel, { fontSize: isTablet ? 14 : 12 }]}>
                  Weekly Change
                </Text>
              </View>
              <View style={[styles.changeValueContainer, {
                backgroundColor: portfolioOverview.weeklyChange >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)'
              }]}>
                <Text style={[
                  styles.changeValue,
                  { 
                    color: portfolioOverview.weeklyChange >= 0 ? "#34C759" : "#FF3B30",
                    fontSize: isTablet ? 18 : 16
                  }
                ]}>
                  {portfolioOverview.weeklyChange >= 0 ? '+' : ''}{portfolioOverview.weeklyChange}%
                </Text>
                <Text style={[
                  styles.changeAmount,
                  { 
                    color: portfolioOverview.weeklyChange >= 0 ? "#34C759" : "#FF3B30",
                    fontSize: isTablet ? 14 : 12
                  }
                ]}>
                  ({portfolioOverview.weeklyChange >= 0 ? '+' : ''}${portfolioOverview.weeklyChangeAmount})
                </Text>
              </View>
            </View>
          </View>

          {/* Market Event Alert */}
          <TouchableOpacity 
            style={styles.marketEventAlert}
            onPress={() => setShowMarketEvent(true)}
          >
            <View style={styles.marketEventHeader}>
              <Ionicons name={currentEvent.icon as any} size={20} color={currentEvent.color} />
              <Text style={[styles.marketEventTitle, { color: currentEvent.color }]}>
                {currentEvent.title}
              </Text>
              <Text style={styles.marketEventImpact}>{currentEvent.impact}</Text>
            </View>
            <Text style={styles.marketEventDescription}>
              {currentEvent.description}
            </Text>
          </TouchableOpacity>

          {/* Leaderboard Teaser */}
          <View style={styles.leaderboardTeaser}>
            <View style={styles.leaderboardHeader}>
              <Text style={styles.leaderboardTitle}>Global Rankings</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.leaderboardList}>
              {leaderboardData.slice(0, 3).map((player) => (
                <View 
                  key={player.rank} 
                  style={[
                    styles.leaderboardItem,
                    player.you && styles.leaderboardItemHighlight
                  ]}
                >
                  <Text style={styles.playerRank}>#{player.rank}</Text>
                  <Text style={[
                    styles.playerName,
                    player.you && styles.playerNameHighlight
                  ]}>
                    {player.name}
                  </Text>
                  <Text style={styles.playerNetWorth}>
                    ${player.netWorth.toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Breakdown Cards Section */}
        <View style={[styles.breakdownCardsSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
          <Text style={[styles.sectionTitle, { fontSize: isTablet ? 24 : 20 }]}>
            Portfolio Breakdown
          </Text>
          <Text style={[styles.sectionSubtitle, { fontSize: isTablet ? 16 : 14 }]}>
            Tap any card to view details
          </Text>
          
          <View style={styles.cardsGrid}>
            {portfolioBreakdown.map((item) => (
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

        {/* Interactive Graphs Section */}
        <View style={[styles.graphsSection, { paddingHorizontal: isTablet ? 40 : 20 }]}>
          {/* Wealth Growth Graph */}
          <View style={styles.graphCard}>
            <View style={styles.graphHeader}>
              <Text style={[styles.graphTitle, { fontSize: isTablet ? 24 : 20 }]}>
                Wealth Growth
              </Text>
              <View style={styles.timeframeSelector}>
                <TouchableOpacity
                  style={[
                    styles.timeframeButton,
                    selectedTimeframe === 'weekly' && styles.timeframeButtonActive
                  ]}
                  onPress={() => setSelectedTimeframe('weekly')}
                >
                  <Text style={[
                    styles.timeframeButtonText,
                    selectedTimeframe === 'weekly' && styles.timeframeButtonTextActive
                  ]}>
                    Weekly
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.timeframeButton,
                    selectedTimeframe === 'monthly' && styles.timeframeButtonActive
                  ]}
                  onPress={() => setSelectedTimeframe('monthly')}
                >
                  <Text style={[
                    styles.timeframeButtonText,
                    selectedTimeframe === 'monthly' && styles.timeframeButtonTextActive
                  ]}>
                    Monthly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Simple Line Chart Visualization */}
            <View style={styles.chartContainer}>
              <View style={styles.yAxis}>
                <Text style={styles.yAxisLabel}>$16K</Text>
                <Text style={styles.yAxisLabel}>$15K</Text>
                <Text style={styles.yAxisLabel}>$14K</Text>
                <Text style={styles.yAxisLabel}>$13K</Text>
                <Text style={styles.yAxisLabel}>$12K</Text>
              </View>
              <View style={styles.chartArea}>
                <View style={styles.chartLine}>
                  {wealthGrowthData.map((point, index) => (
                    <View
                      key={index}
                      style={[
                        styles.chartPoint,
                        {
                          bottom: `${((point.value - 12000) / 4000) * 100}%`,
                          left: `${(index / (wealthGrowthData.length - 1)) * 100}%`
                        }
                      ]}
                    />
                  ))}
                </View>
                <View style={styles.xAxis}>
                  {wealthGrowthData.map((point, index) => (
                    <Text key={index} style={styles.xAxisLabel}>
                      W{index + 1}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Investment Allocation Pie Chart */}
          <View style={styles.graphCard}>
            <Text style={[styles.graphTitle, { fontSize: isTablet ? 24 : 20 }]}>
              Investment Allocation
            </Text>
            
            <View style={styles.pieChartContainer}>
              {/* Simple Pie Chart representation */}
              <View style={styles.pieChart}>
                {allocationData.map((slice, index) => {
                  const isSelected = selectedSlice === slice.id;
                  return (
                    <TouchableOpacity
                      key={slice.id}
                      style={[
                        styles.pieSlice,
                        {
                          backgroundColor: slice.color,
                          opacity: isSelected ? 1 : selectedSlice ? 0.3 : 0.8,
                          transform: isSelected ? [{ scale: 1.05 }] : [{ scale: 1 }]
                        }
                      ]}
                      onPress={() => setSelectedSlice(isSelected ? null : slice.id)}
                    >
                      <Text style={styles.pieSliceText}>
                        {Math.abs(slice.percentage)}%
                      </Text>
                      <Text style={styles.pieSliceLabel}>
                        {slice.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Allocation Legend */}
              <View style={styles.allocationLegend}>
                {allocationData.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.legendItem}
                    onPress={() => setSelectedSlice(selectedSlice === item.id ? null : item.id)}
                  >
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <View style={styles.legendText}>
                      <Text style={styles.legendLabel}>{item.label}</Text>
                      <Text style={styles.legendValue}>
                        {Math.abs(item.percentage)}% (${Math.abs(item.value).toLocaleString()})
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Selected Slice Explanation */}
            {selectedSlice && (
              <View style={styles.explanationCard}>
                <Text style={styles.explanationTitle}>
                  {allocationData.find(item => item.id === selectedSlice)?.label}
                </Text>
                <Text style={styles.explanationText}>
                  {allocationData.find(item => item.id === selectedSlice)?.explanation}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Original Content */}
        <View style={styles.mainContent}>
          <Text style={styles.title}>Additional portfolio features coming soon...</Text>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.floatingActionButton}
        onPress={() => setShowActionSheet(true)}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Action Sheet Modal */}
      {showActionSheet && (
        <TouchableOpacity 
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setShowActionSheet(false)}
        >
          <View style={styles.actionSheetContainer}>
            <TouchableOpacity 
              style={styles.actionSheetHeader}
              activeOpacity={1}
            >
              <View style={styles.actionSheetHandle} />
              <Text style={styles.actionSheetTitle}>Portfolio Actions</Text>
              <Text style={styles.actionSheetSubtitle}>
                Choose how to manage your money
              </Text>
            </TouchableOpacity>

            <View style={styles.actionsGrid}>
              {portfolioActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => {
                    setShowActionSheet(false);
                    // TODO: Navigate to specific action screen
                    console.log(`Selected action: ${action.title}`);
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
              onPress={() => setShowActionSheet(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <TouchableOpacity 
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setShowAchievements(false)}
        >
          <View style={styles.achievementsModal}>
            <TouchableOpacity 
              style={styles.actionSheetHeader}
              activeOpacity={1}
            >
              <View style={styles.actionSheetHandle} />
              <Text style={styles.actionSheetTitle}>Achievements</Text>
              <Text style={styles.actionSheetSubtitle}>
                Your financial milestones
              </Text>
            </TouchableOpacity>

            <ScrollView style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View 
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    !achievement.unlocked && styles.achievementCardLocked
                  ]}
                >
                  <View style={[
                    styles.achievementIcon,
                    { backgroundColor: achievement.unlocked ? achievement.color : '#d1d5db' }
                  ]}>
                    <Ionicons 
                      name={achievement.icon as any} 
                      size={24} 
                      color="#fff" 
                    />
                  </View>
                  <View style={styles.achievementContent}>
                    <View style={styles.achievementHeader}>
                      <Text style={[
                        styles.achievementTitle,
                        !achievement.unlocked && styles.achievementTitleLocked
                      ]}>
                        {achievement.title}
                      </Text>
                      {achievement.unlocked && (
                        <Text style={styles.achievementReward}>
                          {achievement.reward}
                        </Text>
                      )}
                    </View>
                    <Text style={[
                      styles.achievementDescription,
                      !achievement.unlocked && styles.achievementDescriptionLocked
                    ]}>
                      {achievement.description}
                    </Text>
                    {!achievement.unlocked && (
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                          <View 
                            style={[
                              styles.progressFill,
                              { width: `${achievement.progress}%` }
                            ]} 
                          />
                        </View>
                        <Text style={styles.progressText}>
                          {achievement.progress}%
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      )}

      {/* Market Event Modal */}
      {showMarketEvent && (
        <TouchableOpacity 
          style={styles.actionSheetOverlay}
          activeOpacity={1}
          onPress={() => setShowMarketEvent(false)}
        >
          <View style={styles.marketEventModal}>
            <View style={styles.marketEventModalHeader}>
              <Ionicons 
                name={currentEvent.icon as any} 
                size={32} 
                color={currentEvent.color} 
              />
              <Text style={[styles.marketEventModalTitle, { color: currentEvent.color }]}>
                {currentEvent.title}
              </Text>
              <Text style={styles.marketEventModalImpact}>
                {currentEvent.impact}
              </Text>
            </View>
            
            <Text style={styles.marketEventModalDescription}>
              {currentEvent.description}
            </Text>
            
            <Text style={styles.marketEventDecision}>
              {currentEvent.decision}
            </Text>
            
            <View style={styles.marketEventActions}>
              <TouchableOpacity style={[styles.marketEventButton, styles.sellButton]}>
                <Text style={styles.marketEventButtonText}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.marketEventButton, styles.holdButton]}>
                <Text style={styles.marketEventButtonText}>Hold</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.marketEventButton, styles.buyButton]}>
                <Text style={styles.marketEventButtonText}>Buy More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
