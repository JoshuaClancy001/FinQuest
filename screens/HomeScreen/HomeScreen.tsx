import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Dimensions, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile, DailyQuest, LeaderboardData } from '../../types';
import { PortfolioData } from '../../types/portfolioData';
import { homeScreenStyles as styles } from '../../styles/HomeScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../contexts/UserContext';
import { User } from '../../types/user';
import HomeScreenHeader from './HomeScreenHeader';
import HomeScreenProgressCTASection from './HomeScreenProgressCTASection';
import HomeScreenPortfolio from './HomeScreenPortfolio';
import HomeScreenDailyChallenge from './HomeScreenDailyChallenge';
import HomeScreenLeaderboard from './HomeScreenLeaderboard';
import HomeScreenModals, { SimulationState, SimulationStep, CourseCategory } from './HomeScreenModals/HomeScreenModals';

export default function HomeScreen(): React.JSX.Element {

const { setUser } = useUser();

  useEffect(() => {
    const initialUser: User = {
      id: "123",
      username: "Josh",
      initials: "JJC",
      xp: 2150,
      cash: 5750,
      streak: 12,
      level: 8,
      lessonsCompleted: 15,
      currentLessons: {
        "Financial Basics": 3,
        "Saving & Emergency Funds": 2,
        "Debt Management": 1,
        "Investing Fundamentals": 2,
        "Advanced Financial Planning": 1
      },
      portfolio: new PortfolioData(1000, 1000, 1000, 1000, 1000 , 0, 0, 0, 0, 0, 0, [4800, 4950, 5000, 5050, 5200]),
      avatar: '👤',
      rank: 4,
      change: '+1',
      badges: ['big-saver', 'consistent-trader'],
      titles: ['Market Apprentice', 'Savings Champion']
    };

    setUser(initialUser);
  }, []); // Empty dependency array - run only once on mount



  const navigation = useNavigation();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSimulationModal, setShowSimulationModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    cash: 1500,
    savings: 0,
    debt: 0,
    stress: 0,
    canWork: true
  });
  let {user} = useUser();
  
  // Get screen dimensions for responsive sizing
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  // Daily Quest/Scenario data (hard-coded for now)
  const dailyQuests: DailyQuest[] = [
    {
      id: 1,
      title: "Emergency Challenge",
      description: "Test your financial skills in a real-world scenario!",
      icon: "car" as keyof typeof Ionicons.glyphMap,
      color: "#FF6B35",
      reward: 150,
      type: "scenario"
    },
    {
      id: 2,
      title: "Market Opportunity",
      description: "Make smart investment decisions to grow your wealth!",
      icon: "trending-up" as keyof typeof Ionicons.glyphMap,
      color: "#34C759",
      reward: 200,
      type: "investment"
    },
    {
      id: 3,
      title: "Learning Streak",
      description: "Challenge yourself with financial knowledge!",
      icon: "school" as keyof typeof Ionicons.glyphMap,
      color: "#007AFF",
      reward: 200,
      type: "lesson"
    },
    {
      id: 4,
      title: "Budget Master",
      description: "Put your budgeting skills to the test!",
      icon: "calculator" as keyof typeof Ionicons.glyphMap,
      color: "#AF52DE",
      reward: 250,
      type: "budget"
    },
    {
      id: 5,
      title: "Savings Goal",
      description: "Build your emergency fund through smart choices!",
      icon: "shield-checkmark" as keyof typeof Ionicons.glyphMap,
      color: "#FF9500",
      reward: 100,
      type: "savings"
    }
  ];

  // Select today's quest based on date (pseudo-random but consistent per day)
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const todaysQuest = dailyQuests[dayOfYear % dailyQuests.length];

  // Life Simulation Scenario
  const simulationSteps: SimulationStep[] = [
    {
      title: "Payday!",
      description: "It's Friday, you've just been paid $1,500. What do you want to do first?",
      options: [
        { text: "Save $300 (emergency fund)", action: () => setSimulationState(prev => ({ ...prev, cash: 1200, savings: 300 })) },
        { text: "Pay bills only", action: () => {} },
        { text: "Spend big on shopping/fun", action: () => setSimulationState(prev => ({ ...prev, cash: 1000, stress: prev.stress + 10 })) }
      ]
    },
    {
      title: "Bills Due",
      description: "Your rent ($800) and utilities ($200) are due.",
      options: [
        { text: "Pay on time", action: () => setSimulationState(prev => ({ ...prev, cash: prev.cash - 1000 })) },
        { text: "Delay payment", action: () => setSimulationState(prev => ({ ...prev, stress: prev.stress + 20 })) }
      ]
    },
    {
      title: "Lifestyle Choice",
      description: "You see friends going out for dinner and a movie ($60). Join them?",
      options: [
        { text: "Yes, spend", action: () => setSimulationState(prev => ({ ...prev, cash: prev.cash - 60 })) },
        { text: "No, cook at home", action: () => {} }
      ]
    },
    {
      title: "Surprise Expense",
      description: "Your phone bill ($80) auto-charged. Do you have enough?",
      options: [
        { text: "Covered easily", action: () => setSimulationState(prev => ({ ...prev, cash: prev.cash - 80 })) },
        { text: "Put on credit card", action: () => setSimulationState(prev => ({ ...prev, debt: prev.debt + 80 })) },
        { text: "Miss payment", action: () => setSimulationState(prev => ({ ...prev, stress: prev.stress + 15 })) }
      ]
    },
    {
      title: "Emergency!",
      description: "Your car breaks down: repair costs $300.",
      options: [
        { text: "Pay with savings", action: () => setSimulationState(prev => ({ ...prev, savings: Math.max(0, prev.savings - 300), cash: prev.savings < 300 ? prev.cash - (300 - prev.savings) : prev.cash })) },
        { text: "Use credit card", action: () => setSimulationState(prev => ({ ...prev, debt: prev.debt + 300, stress: prev.stress + 10 })) },
        { text: "Borrow from friend/family", action: () => setSimulationState(prev => ({ ...prev, stress: prev.stress + 15 })) },
        { text: "Skip the repair", action: () => setSimulationState(prev => ({ ...prev, canWork: false, stress: prev.stress + 25 })) }
      ]
    },
    {
      title: "Work Impact",
      description: simulationState.canWork ? "You make it to work this week. Income stays stable." : "You can't get to work without your car!",
      options: [
        { text: "Continue", action: () => {
          if (!simulationState.canWork) {
            setSimulationState(prev => ({ ...prev, cash: prev.cash - 300 }));
          }
        }}
      ]
    },
    {
      title: "Stress Factor",
      description: `Your stress level is ${simulationState.stress}/100. How do you handle it?`,
      options: [
        { text: "Try side hustle (extra $100)", action: () => setSimulationState(prev => ({ ...prev, cash: prev.cash + 100, stress: Math.max(0, prev.stress - 10) })) },
        { text: "Ignore it and hope for best", action: () => setSimulationState(prev => ({ ...prev, stress: prev.stress + 5 })) }
      ]
    },
    {
      title: "Next Payday",
      description: `After all decisions, here's your financial state: Cash: $${simulationState.cash}, Savings: $${simulationState.savings}, Debt: $${simulationState.debt}`,
      options: [
        { text: "See Results", action: () => {} }
      ]
    },
    {
      title: "Results",
      description: getSimulationFeedback(),
      options: [
        { text: "Claim Reward", action: () => {
          // Award XP based on performance
          const bonus = simulationState.savings > 0 ? 200 : simulationState.debt < 200 ? 150 : 100;
          // Here you would update user XP
          setShowSimulationModal(false);
          setCurrentStep(0);
          setSimulationState({ cash: 1500, savings: 0, debt: 0, stress: 0, canWork: true });
        }}
      ]
    }
  ];

  function getSimulationFeedback() {
    if (simulationState.savings > 0 && simulationState.debt === 0) {
      return "Excellent! Your emergency fund saved you from debt. You're financially prepared! +200 XP";
    } else if (simulationState.debt > 300) {
      return `You accumulated $${simulationState.debt} in debt. Credit card interest will keep growing. Plan better next time! +100 XP`;
    } else if (!simulationState.canWork) {
      return "Skipping the car repair cost you more in lost wages than fixing it would have. +100 XP";
    } else {
      return "You made it through, but there's room for improvement in your financial planning! +150 XP";
    }
  }

  // Leaderboard data (hard-coded for now)
  const leaderboardData: LeaderboardData = {
    userRank: 7,
    totalUsers: 1247,
    weeklyRank: 7,
    friendsAhead: 3,
    friendsNames: ['Sarah', 'Mike', 'Alex'],
    pointsToNext: 85,
    weeklyPoints: 1240
  };

  // Profile picture selection handlers
  const handleAvatarPress = () => {
    setShowProfileModal(true);
  };

  const handleCTAPress = () => {
    setShowCategoryModal(true);
  };

  const handleCategorySelect = (category: string) => {
    setShowCategoryModal(false);
    
    // Get the user's current lesson progress for this category
    const currentLessonNumber = user?.currentLessons?.[category] || 1;
    
    // Navigate to Learn screen with the selected category and current lesson
    (navigation as any).navigate('Learn', { 
      selectedCategory: category,
      resumeLesson: true,
      category: category,
      lessonIndex: currentLessonNumber - 1, // Convert to 0-based index
      lessonStep: 0 // Start from the beginning of the lesson
    });
  };

  // Available course categories
  const courseCategories: CourseCategory[] = [
    {
      name: "Financial Basics",
      icon: "school" as keyof typeof Ionicons.glyphMap,
      color: "#007AFF",
      description: "Learn the fundamentals of money management"
    },
    {
      name: "Saving & Emergency Funds", 
      icon: "shield-checkmark" as keyof typeof Ionicons.glyphMap,
      color: "#34C759",
      description: "Build your financial safety net"
    },
    {
      name: "Debt Management",
      icon: "card" as keyof typeof Ionicons.glyphMap,
      color: "#FF6B35", 
      description: "Master credit and debt strategies"
    },
    {
      name: "Investing Fundamentals",
      icon: "trending-up" as keyof typeof Ionicons.glyphMap,
      color: "#AF52DE",
      description: "Start your investment journey"
    },
    {
      name: "Advanced Financial Planning",
      icon: "analytics" as keyof typeof Ionicons.glyphMap,
      color: "#FF9500",
      description: "Plan for long-term financial success"
    }
  ];

  const handlePortfolioPress = () => {
    navigation.navigate('Portfolio' as never);
  };

  const handleDailyChallengePress = () => {
    setShowSimulationModal(true);
  };

  const handleLeaderboardPress = () => {
    navigation.navigate('Leaderboard' as never);
  };

  // Modal handlers
  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleCloseSimulationModal = () => {
    setShowSimulationModal(false);
    setCurrentStep(0);
    setSimulationState({ cash: 1500, savings: 0, debt: 0, stress: 0, canWork: true });
  };

  const handleSimulationStepAction = (action: () => void) => {
    action();
  };

  const handleSimulationNextStep = () => {
    if (currentStep < simulationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: isTablet ? 40 : 20 }]}
      >
        <Text></Text>
        <Text></Text>
        {/* Header/Status Bar */}
        <HomeScreenHeader user={user} onAvatarPress={handleAvatarPress} />

        {/* Progress & CTA Section */}
        <HomeScreenProgressCTASection user={user} onCTAPress={handleCTAPress} />

        {/* Portfolio Snapshot */}
        <HomeScreenPortfolio user={user} onPortfolioPress={handlePortfolioPress} />

        {/* Daily Quest / Scenario */}
        <HomeScreenDailyChallenge todaysQuest={todaysQuest} onChallengePress={handleDailyChallengePress} />

        {/* Leaderboard Teaser */}
        <HomeScreenLeaderboard leaderboardData={leaderboardData} onLeaderboardPress={handleLeaderboardPress} />
      </ScrollView>

      {/* Modals */}
      <HomeScreenModals
        showProfileModal={showProfileModal}
        onCloseProfileModal={handleCloseProfileModal}
        showSimulationModal={showSimulationModal}
        currentStep={currentStep}
        simulationState={simulationState}
        simulationSteps={simulationSteps}
        onCloseSimulationModal={handleCloseSimulationModal}
        onSimulationStepAction={handleSimulationStepAction}
        onSimulationNextStep={handleSimulationNextStep}
        showCategoryModal={showCategoryModal}
        onCloseCategoryModal={() => setShowCategoryModal(false)}
        courseCategories={courseCategories}
        onCategorySelect={handleCategorySelect}
        userCurrentLessons={user?.currentLessons}
      />
    </SafeAreaView>
  );
}
