import React, { useState } from 'react';
import { View, Text, StatusBar, ScrollView, Dimensions, Platform, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { portfolioScreenStyles as styles } from '../../styles/PortfolioScreenStyles';
import { useUser } from '../../contexts/UserContext';
import PortfolioScreenOverview from './PortfolioScreenOverview';
import PortfolioScreenBreakdown from './PortfolioScreenBreakdown';
import PortfolioScreenGraphs from './PortfolioScreenGraphs';
import PortfolioScreenModals from './PortfolioScreenModals';

export default function PortfolioScreen(): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;
  const isAndroid = Platform.OS === 'android';

  // Get user context
  const { user, updateCoinsAndXp, updateUser } = useUser();

  // Modal states
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<typeof fakeStocks[0] | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeAmount, setTradeAmount] = useState('');

  // Real estate modal states
  const [showRealEstateModal, setShowRealEstateModal] = useState(false);
  const [selectedRealEstate, setSelectedRealEstate] = useState<typeof fakeRealEstate[0] | null>(null);
  const [realEstateTradeType, setRealEstateTradeType] = useState<'buy' | 'sell'>('buy');
  const [realEstateTradeAmount, setRealEstateTradeAmount] = useState('');

  // ETF modal states
  const [showETFModal, setShowETFModal] = useState(false);
  const [selectedETF, setSelectedETF] = useState<typeof fakeETFs[0] | null>(null);
  const [etfTradeType, setETFTradeType] = useState<'buy' | 'sell'>('buy');
  const [etfTradeAmount, setETFTradeAmount] = useState('');

  // Crypto modal states
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<typeof fakeCrypto[0] | null>(null);
  const [cryptoTradeType, setCryptoTradeType] = useState<'buy' | 'sell'>('buy');
  const [cryptoTradeAmount, setCryptoTradeAmount] = useState('');

  // Bonds modal states
  const [showBondsModal, setShowBondsModal] = useState(false);
  const [selectedBond, setSelectedBond] = useState<typeof fakeBonds[0] | null>(null);
  const [bondsTradeType, setBondsTradeType] = useState<'buy' | 'sell'>('buy');
  const [bondsTradeAmount, setBondsTradeAmount] = useState('');

  // Mock stock data for trading
  const fakeStocks = [
    { symbol: 'NIMB', name: 'Nimbus Innovations', price: 45.32, change: 2.4 },
    { symbol: 'ATLS', name: 'Atlas Technologies', price: 128.67, change: -1.2 },
    { symbol: 'CRWN', name: 'Crown Dynamics', price: 89.45, change: 0.8 },
    { symbol: 'HRZN', name: 'Horizon Systems', price: 234.12, change: -3.1 },
    { symbol: 'VYGR', name: 'Voyager Corp', price: 67.89, change: 1.9 },
  ];

  // Mock real estate data for trading
  const fakeRealEstate = [
    { symbol: 'SPG', name: 'Simon Property Group', price: 124.56, change: 1.23, type: 'Mall REIT', yield: 5.2 },
    { symbol: 'PLD', name: 'Prologis Inc.', price: 134.89, change: -0.45, type: 'Industrial REIT', yield: 3.1 },
    { symbol: 'AMT', name: 'American Tower Corp.', price: 198.23, change: 2.34, type: 'Cell Tower REIT', yield: 3.4 },
    { symbol: 'CCI', name: 'Crown Castle Inc.', price: 89.45, change: -1.12, type: 'Cell Tower REIT', yield: 6.8 },
    { symbol: 'EQIX', name: 'Equinix Inc.', price: 756.78, change: 8.90, type: 'Data Center REIT', yield: 1.9 },
  ];

  // Mock ETF data for trading
  const fakeETFs = [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', price: 521.34, change: 1.23, type: 'Large Cap Blend', expenseRatio: 0.09 },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 456.78, change: -0.89, type: 'Large Cap Growth', expenseRatio: 0.20 },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market', price: 243.67, change: 0.95, type: 'Total Stock Market', expenseRatio: 0.03 },
    { symbol: 'VXUS', name: 'Vanguard Total International', price: 67.89, change: -1.45, type: 'International', expenseRatio: 0.08 },
    { symbol: 'BND', name: 'Vanguard Total Bond Market', price: 72.34, change: 0.12, type: 'Total Bond Market', expenseRatio: 0.03 },
  ];

  // Mock crypto data for trading
  const fakeCrypto = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250.67, change: -2.45, type: 'Store of Value', marketCap: 846.5 },
    { symbol: 'ETH', name: 'Ethereum', price: 2678.34, change: -4.12, type: 'Smart Contract Platform', marketCap: 321.8 },
    { symbol: 'ADA', name: 'Cardano', price: 0.89, change: 1.67, type: 'Proof of Stake', marketCap: 29.4 },
    { symbol: 'SOL', name: 'Solana', price: 134.56, change: -6.78, type: 'High Performance', marketCap: 58.9 },
    { symbol: 'DOT', name: 'Polkadot', price: 12.45, change: 2.34, type: 'Interoperability', marketCap: 15.2 },
  ];

  const fakeBonds = [
    { symbol: 'US10Y', name: 'US 10-Year Treasury', price: 97.25, change: 0.15, yield: 4.32, duration: 8.5, type: 'Government' },
    { symbol: 'US30Y', name: 'US 30-Year Treasury', price: 94.78, change: -0.23, yield: 4.58, duration: 20.1, type: 'Government' },
    { symbol: 'AAPL', name: 'Apple Inc. Corporate Bond', price: 101.45, change: 0.08, yield: 3.75, duration: 5.2, type: 'Corporate' },
    { symbol: 'MSFT', name: 'Microsoft Corporate Bond', price: 99.87, change: -0.12, yield: 3.92, duration: 7.3, type: 'Corporate' },
    { symbol: 'NYC', name: 'NYC Municipal Bond', price: 102.13, change: 0.25, yield: 3.15, duration: 12.4, type: 'Municipal' },
  ];

  // Debug: Log the current user portfolio values
  console.log('User portfolio values:', {
    stocks: user?.portfolio.individualStocksValue,
    etfs: user?.portfolio.etfsValue,
    realEstate: user?.portfolio.realEstateValue,
    crypto: user?.portfolio.cryptoValue,
    bonds: user?.portfolio.bondsValue,
  });

  // Portfolio breakdown data for investment cards using user context data
  const portfolioBreakdown = [
    {
      id: 'stocks',
      title: 'Individual Stocks',
      icon: 'trending-up',
      value: user ? user.portfolio.individualStocksValue : 0,
      change: user ? user.portfolio.individualStocksDailyChangePercent : 3.2,
      type: 'investment',
      color: '#34C759',
      backgroundColor: isAndroid ? '#fff' : 'rgba(52, 199, 89, 0.1)',
      description: 'Apple, Microsoft, Tesla'
    },
    {
      id: 'etfs',
      title: 'ETFs & Index Funds',
      icon: 'bar-chart',
      value: user ? user.portfolio.etfsValue : 3750,
      change: user ? user.portfolio.etfsDailyChangePercent : 1.8,
      type: 'investment',
      color: '#007AFF',
      backgroundColor: isAndroid ? '#fff' : 'rgba(0, 122, 255, 0.1)',
      description: 'S&P 500, Total Market'
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      icon: 'home',
      value: user ? user.portfolio.realEstateValue : 3600,
      change: user ? user.portfolio.realEstateDailyChangePercent : 1.2,
      type: 'investment',
      color: '#FF9500',
      backgroundColor: isAndroid ? '#fff' : 'rgba(255, 149, 0, 0.1)',
      description: 'REITs & Property shares'
    },
    {
      id: 'crypto',
      title: 'Cryptocurrency',
      icon: 'logo-bitcoin',
      value: user ? user.portfolio.cryptoValue : 1200,
      change: user ? user.portfolio.cryptoDailyChangePercent : -4.5,
      type: 'investment',
      color: '#8E4EC6',
      backgroundColor: isAndroid ? '#fff' : 'rgba(142, 78, 198, 0.1)',
      description: 'Bitcoin, Ethereum'
    },
    {
      id: 'bonds',
      title: 'Bonds & Treasury',
      icon: 'shield-checkmark',
      value: user ? user.portfolio.bondsValue : 2000,
      change: user ? user.portfolio.bondsDailyChangePercent : 0.5,
      type: 'investment',
      color: '#00C7BE',
      backgroundColor: isAndroid ? '#fff' : 'rgba(0, 199, 190, 0.1)',
      description: 'Government & Corporate'
    }
  ];

  // Wealth growth data (last 8 weeks) from user context
  const wealthGrowthData = user && user.portfolio.chartData ? 
    user.portfolio.chartData.map((value, index) => ({
      week: `Week ${index + 1}`,
      value: value
    })) : [
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
  const allocationData = user ? [
    {
      id: 'stocks',
      label: 'Individual Stocks',
      percentage: Math.round((user.portfolio.individualStocksValue / user.portfolio.totalValue) * 100),
      value: user.portfolio.individualStocksValue,
      color: '#34C759',
      explanation: 'Individual stocks give you direct ownership in companies. Higher risk but potentially higher returns. Research companies before investing.'
    },
    {
      id: 'etfs',
      label: 'ETFs & Index Funds',
      percentage: Math.round((user.portfolio.etfsValue / user.portfolio.totalValue) * 100),
      value: user.portfolio.etfsValue,
      color: '#007AFF',
      explanation: 'ETFs provide instant diversification across hundreds of stocks. Lower risk than individual stocks and great for beginners.'
    },
    {
      id: 'realestate',
      label: 'Real Estate',
      percentage: Math.round((user.portfolio.realEstateValue / user.portfolio.totalValue) * 100),
      value: user.portfolio.realEstateValue,
      color: '#FF9500',
      explanation: 'Real estate investment through REITs provides exposure to property markets without buying physical real estate.'
    },
    {
      id: 'bonds',
      label: 'Bonds & Treasury',
      percentage: Math.round((user.portfolio.bondsValue / user.portfolio.totalValue) * 100),
      value: user.portfolio.bondsValue,
      color: '#00C7BE',
      explanation: 'Bonds provide steady income and stability to your portfolio. Government bonds are very safe but offer lower returns.'
    },
    {
      id: 'crypto',
      label: 'Cryptocurrency',
      percentage: Math.round((user.portfolio.cryptoValue / user.portfolio.totalValue) * 100),
      value: user.portfolio.cryptoValue,
      color: '#8E4EC6',
      explanation: 'Crypto is highly volatile and speculative. Only invest what you can afford to lose. Consider it a small part of your portfolio.'
    }
  ] : [
    {
      id: 'stocks',
      label: 'Individual Stocks',
      percentage: 33,
      value: 50,
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

  // Stock trading handlers
  const handleStockSelect = (stock: typeof fakeStocks[0]) => {
    setSelectedStock(stock);
    setShowStockModal(true);
  };

  const handleTrade = () => {
    if (!selectedStock || !tradeAmount || !user) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(tradeAmount);
    const totalCost = amount * selectedStock.price;

    if (tradeType === 'buy') {
      if (user.cash < totalCost) {
        Alert.alert('Insufficient Funds', `You need $${totalCost.toFixed(2)} to buy ${amount} shares of ${selectedStock.symbol}`);
        return;
      }
      // Deduct cash and award XP for making investment
      updateCoinsAndXp(10, -totalCost);
      
      // Update the user's portfolio stocks value
      const newStocksValue = user.portfolio.individualStocksValue + totalCost;
      user.portfolio.updateStocksValue(newStocksValue);
      
      Alert.alert('Success!', `Bought ${amount} shares of ${selectedStock.symbol} for $${totalCost.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowStockModal(false) }
      ]);
    } else {
      // For selling, we'll assume they have the shares (simplified)
      const sellValue = totalCost * 0.98; // 2% trading fee
      updateCoinsAndXp(5, sellValue);
      
      // Update the user's portfolio stocks value (reduce by sell amount)
      const newStocksValue = Math.max(0, user.portfolio.individualStocksValue - totalCost);
      user.portfolio.updateStocksValue(newStocksValue);
      
      Alert.alert('Success!', `Sold ${amount} shares of ${selectedStock.symbol} for $${sellValue.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowStockModal(false) }
      ]);
    }

    setTradeAmount('');
  };

  // Real estate trading handlers
  const handleRealEstateSelect = (property: typeof fakeRealEstate[0]) => {
    setSelectedRealEstate(property);
    setShowRealEstateModal(true);
  };

  const handleRealEstateTrade = () => {
    if (!selectedRealEstate || !realEstateTradeAmount || !user) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(realEstateTradeAmount);
    const totalCost = amount * selectedRealEstate.price;

    if (realEstateTradeType === 'buy') {
      if (user.cash < totalCost) {
        Alert.alert('Insufficient Funds', `You need $${totalCost.toFixed(2)} to buy ${amount} shares of ${selectedRealEstate.symbol}`);
        return;
      }
      // Deduct cash and award XP for making investment
      updateCoinsAndXp(10, -totalCost);
      
      // Update the user's portfolio real estate value
      const newRealEstateValue = user.portfolio.realEstateValue + totalCost;
      user.portfolio.updateRealEstateValue(newRealEstateValue);
      
      Alert.alert('Success!', `Bought ${amount} shares of ${selectedRealEstate.symbol} for $${totalCost.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowRealEstateModal(false) }
      ]);
    } else {
      // For selling, we'll assume they have the shares (simplified)
      const sellValue = totalCost * 0.98; // 2% trading fee
      updateCoinsAndXp(5, sellValue);
      
      // Update the user's portfolio real estate value (reduce by sell amount)
      const newRealEstateValue = Math.max(0, user.portfolio.realEstateValue - totalCost);
      user.portfolio.updateRealEstateValue(newRealEstateValue);
      
      Alert.alert('Success!', `Sold ${amount} shares of ${selectedRealEstate.symbol} for $${sellValue.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowRealEstateModal(false) }
      ]);
    }

    setRealEstateTradeAmount('');
  };

  // ETF trading handlers
  const handleETFSelect = (etf: typeof fakeETFs[0]) => {
    setSelectedETF(etf);
    setShowETFModal(true);
  };

  const handleETFTrade = () => {
    if (!selectedETF || !etfTradeAmount || !user) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(etfTradeAmount);
    const totalCost = amount * selectedETF.price;

    if (etfTradeType === 'buy') {
      if (user.cash < totalCost) {
        Alert.alert('Insufficient Funds', `You need $${totalCost.toFixed(2)} to buy ${amount} shares of ${selectedETF.symbol}`);
        return;
      }
      // Deduct cash and award XP for making investment
      updateCoinsAndXp(10, -totalCost);
      
      // Update the user's portfolio ETF value
      const newETFValue = user.portfolio.etfsValue + totalCost;
      user.portfolio.updateEtfsValue(newETFValue);
      
      Alert.alert('Success!', `Bought ${amount} shares of ${selectedETF.symbol} for $${totalCost.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowETFModal(false) }
      ]);
    } else {
      // For selling, we'll assume they have the shares (simplified)
      const sellValue = totalCost * 0.98; // 2% trading fee
      updateCoinsAndXp(5, sellValue);
      
      // Update the user's portfolio ETF value (reduce by sell amount)
      const newETFValue = Math.max(0, user.portfolio.etfsValue - totalCost);
      user.portfolio.updateEtfsValue(newETFValue);
      
      Alert.alert('Success!', `Sold ${amount} shares of ${selectedETF.symbol} for $${sellValue.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowETFModal(false) }
      ]);
    }

    setETFTradeAmount('');
  };

  // Crypto trading handlers
  const handleCryptoSelect = (crypto: typeof fakeCrypto[0]) => {
    setSelectedCrypto(crypto);
    setShowCryptoModal(true);
  };

  const handleCryptoTrade = () => {
    if (!selectedCrypto || !cryptoTradeAmount || !user) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(cryptoTradeAmount);
    const totalCost = amount * selectedCrypto.price;

    if (cryptoTradeType === 'buy') {
      if (user.cash < totalCost) {
        Alert.alert('Insufficient Funds', `You need $${totalCost.toFixed(2)} to buy ${amount} ${selectedCrypto.symbol}`);
        return;
      }
      // Deduct cash and award XP for making investment
      updateCoinsAndXp(15, -totalCost); // Higher XP for crypto (more risky)
      
      // Update the user's portfolio crypto value
      const newCryptoValue = user.portfolio.cryptoValue + totalCost;
      user.portfolio.updateCryptoValue(newCryptoValue);
      
      Alert.alert('Success!', `Bought ${amount} ${selectedCrypto.symbol} for $${totalCost.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowCryptoModal(false) }
      ]);
    } else {
      // For selling, we'll assume they have the crypto (simplified)
      const sellValue = totalCost * 0.975; // 2.5% trading fee (higher for crypto)
      updateCoinsAndXp(8, sellValue);
      
      // Update the user's portfolio crypto value (reduce by sell amount)
      const newCryptoValue = Math.max(0, user.portfolio.cryptoValue - totalCost);
      user.portfolio.updateCryptoValue(newCryptoValue);
      
      Alert.alert('Success!', `Sold ${amount} ${selectedCrypto.symbol} for $${sellValue.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowCryptoModal(false) }
      ]);
    }

    setCryptoTradeAmount('');
  };

  const handleBondSelect = (bond: typeof fakeBonds[0]) => {
    setSelectedBond(bond);
    setShowBondsModal(true);
  };

  const handleBondTrade = () => {
    if (!selectedBond || !bondsTradeAmount || !user) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    const amount = parseFloat(bondsTradeAmount);
    const totalCost = amount * selectedBond.price;

    if (bondsTradeType === 'buy') {
      if (user.cash < totalCost) {
        Alert.alert('Insufficient Funds', `You need $${totalCost.toFixed(2)} to buy ${amount} ${selectedBond.symbol} bonds`);
        return;
      }
      // Deduct cash and award XP for making investment
      updateCoinsAndXp(8, -totalCost); // Lower XP for bonds (safer investment)
      
      // Update the user's portfolio bonds value
      const newBondsValue = user.portfolio.bondsValue + totalCost;
      user.portfolio.updateBondsValue(newBondsValue);
      
      Alert.alert('Success!', `Bought ${amount} ${selectedBond.symbol} bonds for $${totalCost.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowBondsModal(false) }
      ]);
    } else {
      // For selling, we'll assume they have the bonds (simplified)
      const sellValue = totalCost * 0.995; // 0.5% trading fee (lower for bonds)
      updateCoinsAndXp(5, sellValue);
      
      // Update the user's portfolio bonds value (reduce by sell amount)
      const newBondsValue = Math.max(0, user.portfolio.bondsValue - totalCost);
      user.portfolio.updateBondsValue(newBondsValue);
      
      Alert.alert('Success!', `Sold ${amount} ${selectedBond.symbol} bonds for $${sellValue.toFixed(2)}`, [
        { text: 'OK', onPress: () => setShowBondsModal(false) }
      ]);
    }

    setBondsTradeAmount('');
  };

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
        <PortfolioScreenOverview 
          user={user}
          achievements={achievements}
          leaderboardData={leaderboardData}
          currentEvent={currentEvent}
          setShowAchievements={setShowAchievements}
          setShowMarketEvent={setShowMarketEvent}
          updateUser={updateUser}
        />

        {/* Breakdown Cards Section */}
        <PortfolioScreenBreakdown 
          portfolioBreakdown={portfolioBreakdown}
          setShowStockModal={setShowStockModal}
          setShowRealEstateModal={setShowRealEstateModal}
          setShowETFModal={setShowETFModal}
          setShowCryptoModal={setShowCryptoModal}
          setShowBondsModal={setShowBondsModal}
        />

        {/* Interactive Graphs Section */}
        <PortfolioScreenGraphs 
          wealthGrowthData={wealthGrowthData}
          allocationData={allocationData}
          selectedTimeframe={selectedTimeframe}
          selectedSlice={selectedSlice}
          setSelectedTimeframe={setSelectedTimeframe}
          setSelectedSlice={setSelectedSlice}
        />

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

      {/* All Modals */}
      <PortfolioScreenModals 
        showActionSheet={showActionSheet}
        showAchievements={showAchievements}
        showMarketEvent={showMarketEvent}
        showStockModal={showStockModal}
        showRealEstateModal={showRealEstateModal}
        showETFModal={showETFModal}
        showCryptoModal={showCryptoModal}
        showBondsModal={showBondsModal}
        setShowActionSheet={setShowActionSheet}
        setShowAchievements={setShowAchievements}
        setShowMarketEvent={setShowMarketEvent}
        setShowStockModal={setShowStockModal}
        setShowRealEstateModal={setShowRealEstateModal}
        setShowETFModal={setShowETFModal}
        setShowCryptoModal={setShowCryptoModal}
        setShowBondsModal={setShowBondsModal}
        achievements={achievements}
        currentEvent={currentEvent}
        portfolioActions={portfolioActions}
        fakeStocks={fakeStocks}
        fakeRealEstate={fakeRealEstate}
        fakeETFs={fakeETFs}
        fakeCrypto={fakeCrypto}
        fakeBonds={fakeBonds}
        user={user}
        selectedStock={selectedStock}
        tradeType={tradeType}
        tradeAmount={tradeAmount}
        setTradeType={setTradeType}
        setTradeAmount={setTradeAmount}
        selectedRealEstate={selectedRealEstate}
        realEstateTradeType={realEstateTradeType}
        realEstateTradeAmount={realEstateTradeAmount}
        setRealEstateTradeType={setRealEstateTradeType}
        setRealEstateTradeAmount={setRealEstateTradeAmount}
        selectedETF={selectedETF}
        etfTradeType={etfTradeType}
        etfTradeAmount={etfTradeAmount}
        setETFTradeType={setETFTradeType}
        setETFTradeAmount={setETFTradeAmount}
        selectedCrypto={selectedCrypto}
        cryptoTradeType={cryptoTradeType}
        cryptoTradeAmount={cryptoTradeAmount}
        setCryptoTradeType={setCryptoTradeType}
        setCryptoTradeAmount={setCryptoTradeAmount}
        selectedBond={selectedBond}
        bondsTradeType={bondsTradeType}
        bondsTradeAmount={bondsTradeAmount}
        setBondsTradeType={setBondsTradeType}
        setBondsTradeAmount={setBondsTradeAmount}
        handleStockSelect={handleStockSelect}
        handleTrade={handleTrade}
        handleRealEstateSelect={handleRealEstateSelect}
        handleRealEstateTrade={handleRealEstateTrade}
        handleETFSelect={handleETFSelect}
        handleETFTrade={handleETFTrade}
        handleCryptoSelect={handleCryptoSelect}
        handleCryptoTrade={handleCryptoTrade}
        handleBondSelect={handleBondSelect}
        handleBondTrade={handleBondTrade}
      />
    </SafeAreaView>
  );
}
