import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';
import { useRoute } from '@react-navigation/native';
import { Courses, Lesson, Question } from '../../lessons';
import { useUser } from '../../contexts/UserContext';
import LearnScreenHeader from './LearnScreenHeader';
import LearnScreenStats from './LearnScreenStats';
import LearnScreenBadges from './LearnScreenBadges';
import LearnScreenCurriculum from './LearnScreenCurriculum';
import LearnScreenBottomBanner from './LearnScreenBottomBanner';
import LearnScreenModals from './LearnScreenModals';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

// User progress data
const userProgress = {
  dailyXP: 240,
  dailyXPGoal: 300,
  weeklyXP: 1150,
  weeklyXPGoal: 2000,
  streak: 7,
  dailyLessonsCompleted: 1,
  dailyLessonsGoal: 2,
  // Gamification
  totalXP: 1850,
  level: 3,
  coins: 450,
  totalCoins: 890,
  unlockedBadges: ['first_lesson', 'week_warrior', 'budget_master'],
  nextLevelXP: 2000,
  levelXP: 1500, // XP needed for current level
};

// Badge definitions
const badges = {
  first_lesson: {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Completed your first lesson',
    icon: '🎯',
    unlocked: true,
  },
  week_warrior: {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    icon: '🔥',
    unlocked: true,
  },
  budget_master: {
    id: 'budget_master',
    name: 'Budget Master',
    description: 'Completed all budgeting lessons',
    icon: '💰',
    unlocked: true,
  },
  first_1000: {
    id: 'first_1000',
    name: 'First $1,000 Saved',
    description: 'Saved your first $1,000',
    icon: '💎',
    unlocked: false,
  },
  debt_boss: {
    id: 'debt_boss',
    name: 'Beat Debt Boss',
    description: 'Paid off your debt completely',
    icon: '⚔️',
    unlocked: false,
  },
  investment_rookie: {
    id: 'investment_rookie',
    name: 'Investment Rookie',
    description: 'Made your first investment',
    icon: '📈',
    unlocked: false,
  },
};

const LearnScreen = () => {
  const route = useRoute();
  const params = route.params as any;

  const {updateCoinsAndXp, user} = useUser();
  
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [lessonStep, setLessonStep] = useState(0); // 0: intro, 1: quiz, 2: scenario, 3: reward, 4: recap
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newBadge, setNewBadge] = useState<any>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  
  // Interactive lesson state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [selectedScenarioChoice, setSelectedScenarioChoice] = useState<number | null>(null);
  const [showScenarioResult, setShowScenarioResult] = useState(false);
  
  // Dynamic lesson state
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Check if we should resume a lesson from navigation params
  useEffect(() => {
    if (params?.resumeLesson) {
      // Direct lookup using category and lesson index - much faster!
      let foundLesson: Lesson | null = null;
      
      if (params?.category && typeof params?.lessonIndex === 'number') {
        // Direct access to lesson using category and index
        const categoryLessons = Courses[params.category];
        if (categoryLessons && categoryLessons[params.lessonIndex]) {
          foundLesson = categoryLessons[params.lessonIndex];
        }
      }
      
      // Fallback to first lesson if direct lookup fails
      if (!foundLesson) {
        foundLesson = Courses["Financial Basics"][0];
      }
      
      setCurrentLesson(foundLesson);
      setCurrentQuestionIndex(0);
      setShowLessonModal(true);
      setLessonStep(params?.lessonStep || 0);
      console.log(`Resuming lesson: ${foundLesson?.getLessonName()} at step ${params?.lessonStep}`);
    }
  }, [params]);

  const getDailyXPPercentage = () => {
    return Math.min((userProgress.dailyXP / userProgress.dailyXPGoal) * 100, 100);
  };

  const getWeeklyXPPercentage = () => {
    return Math.min((userProgress.weeklyXP / userProgress.weeklyXPGoal) * 100, 100);
  };

  const getRemainingLessons = () => {
    return Math.max(userProgress.dailyLessonsGoal - userProgress.dailyLessonsCompleted, 0);
  };

  const getLevelProgress = () => {
    const currentLevelXP = userProgress.totalXP - userProgress.levelXP;
    const nextLevelXP = userProgress.nextLevelXP - userProgress.levelXP;
    return Math.min((currentLevelXP / nextLevelXP) * 100, 100);
  };

  const getUnlockedBadges = () => {
    return Object.values(badges).filter(badge => badge.unlocked);
  };

  const checkForNewBadges = (xpGained: number, coinsGained: number) => {
    // Check for milestone badges based on progress
    // This would typically check against actual user data
    if (userProgress.totalXP + xpGained >= 2000 && !badges.first_1000.unlocked) {
      setNewBadge(badges.first_1000);
      setShowBadgeModal(true);
    }
  };

  const checkForLevelUp = (xpGained: number) => {
    if (userProgress.totalXP + xpGained >= userProgress.nextLevelXP) {
      setShowLevelUp(true);
    }
  };

  const completeLesson = () => {
    const xpReward = 25;
    const coinReward = 10;
    
    setEarnedXP(xpReward);
    setEarnedCoins(coinReward);
    
    // Check for achievements
    checkForNewBadges(xpReward, coinReward);
    checkForLevelUp(xpReward);
    
    // Update user progress (in real app, this would update backend)
    userProgress.totalXP += xpReward;
    userProgress.coins += coinReward;
    userProgress.totalCoins += coinReward;
    userProgress.dailyXP += xpReward;
    userProgress.weeklyXP += xpReward;
    userProgress.dailyLessonsCompleted += 1;
    
    setShowLessonModal(false);
  };

  const startLesson = (lesson?: Lesson) => {
    if (lesson) {
      setCurrentLesson(lesson);
    }
    setLessonStep(0);
    setShowLessonModal(true);
    // Reset interactive states
    setSelectedQuizAnswer(null);
    setShowQuizResult(false);
    setSelectedScenarioChoice(null);
    setShowScenarioResult(false);
    setCurrentQuestionIndex(0);
  };

  // Quiz interaction handlers for dynamic lessons
  const handleDynamicQuizAnswer = (answerIndex: number) => {
    setSelectedQuizAnswer(answerIndex);
    setShowQuizResult(true);
  };

  const nextQuestion = () => {
    if (currentLesson && currentQuestionIndex < currentLesson.getQuestions().length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedQuizAnswer(null);
      setShowQuizResult(false);
    } else {
      // All questions completed, go to reward step
      setLessonStep(3);
    }
  };

  // Quiz interaction handlers
  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedQuizAnswer(answerIndex);
    setShowQuizResult(true);
  };

  // Scenario interaction handlers  
  const handleScenarioChoice = (choiceIndex: number) => {
    setSelectedScenarioChoice(choiceIndex);
    setShowScenarioResult(true);
  };

  const handleCoinXpAwarding = () => {
    updateCoinsAndXp(25,10)
    console.log(user?.cash, user?.xp)
    setLessonStep(4);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header / Progress Overview */}
        <View style={styles.headerSection}>
          <LearnScreenHeader />
          <LearnScreenStats />
        </View>

        <LearnScreenBadges />
        <LearnScreenCurriculum startLesson={startLesson} />

      </ScrollView>

      <LearnScreenBottomBanner startLesson={startLesson} />

      <LearnScreenModals
        showLessonModal={showLessonModal}
        setShowLessonModal={setShowLessonModal}
        lessonStep={lessonStep}
        setLessonStep={setLessonStep}
        currentLesson={currentLesson}
        currentQuestionIndex={currentQuestionIndex}
        selectedQuizAnswer={selectedQuizAnswer}
        showQuizResult={showQuizResult}
        selectedScenarioChoice={selectedScenarioChoice}
        showScenarioResult={showScenarioResult}
        handleQuizAnswer={handleQuizAnswer}
        nextQuestion={nextQuestion}
        handleScenarioChoice={handleScenarioChoice}
        handleCoinXpAwarding={handleCoinXpAwarding}
        completeLesson={completeLesson}
        showBadgeModal={showBadgeModal}
        setShowBadgeModal={setShowBadgeModal}
        newBadge={newBadge}
        showLevelUp={showLevelUp}
        setShowLevelUp={setShowLevelUp}
        userProgress={userProgress}
      />
    </SafeAreaView>
  );
};

export default LearnScreen;
