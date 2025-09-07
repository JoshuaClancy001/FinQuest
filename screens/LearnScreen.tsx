import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { learnScreenStyles as styles } from '../styles/LearnScreenStyles';

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
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [lessonStep, setLessonStep] = useState(0); // 0: intro, 1: quiz, 2: scenario, 3: reward, 4: recap
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newBadge, setNewBadge] = useState<any>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);

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

  const checkForNewBadges = (xpGained, coinsGained) => {
    // Check for milestone badges based on progress
    // This would typically check against actual user data
    if (userProgress.totalXP + xpGained >= 2000 && !badges.first_1000.unlocked) {
      setNewBadge(badges.first_1000);
      setShowBadgeModal(true);
    }
  };

  const checkForLevelUp = (xpGained) => {
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

  const startLesson = () => {
    setLessonStep(0);
    setShowLessonModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header / Progress Overview */}
        <View style={styles.headerSection}>
          {/* Hero Section with Gradient Background */}
          <View style={styles.heroContainer}>
            <View style={styles.heroContent}>
              <View style={styles.heroTopRow}>
                <View>
                  <Text style={styles.welcomeText}>Ready to learn?</Text>
                  <Text style={styles.motivationText}>Level up your financial game 🚀</Text>
                </View>
                <View style={styles.heroStats}>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>Level {userProgress.level}</Text>
                  </View>
                  <View style={styles.coinContainer}>
                    <Text style={styles.coinIcon}>🪙</Text>
                    <Text style={styles.coinText}>{userProgress.coins}</Text>
                  </View>
                </View>
              </View>
              
              {/* Circular XP Progress */}
              <View style={styles.circularProgressContainer}>
                <View style={styles.circularProgress}>
                  <View style={[styles.circularProgressFill, { 
                    transform: [{ rotate: `${(getDailyXPPercentage() / 100) * 360}deg` }] 
                  }]} />
                  <View style={styles.circularProgressInner}>
                    <Text style={styles.xpNumber}>{userProgress.dailyXP}</Text>
                    <Text style={styles.xpLabel}>XP Today</Text>
                    <Text style={styles.xpGoal}>Goal: {userProgress.dailyXPGoal}</Text>
                  </View>
                </View>
              </View>

              {/* Level Progress Bar */}
              <View style={styles.levelProgressContainer}>
                <Text style={styles.levelProgressText}>
                  Level {userProgress.level} Progress
                </Text>
                <View style={styles.levelProgressBar}>
                  <View style={[styles.levelProgressFill, { 
                    width: `${getLevelProgress()}%` 
                  }]} />
                </View>
                <Text style={styles.levelProgressXP}>
                  {userProgress.totalXP - userProgress.levelXP} / {userProgress.nextLevelXP - userProgress.levelXP} XP
                </Text>
              </View>
            </View>
          </View>

          {/* Streak & Goal Row */}
          <View style={styles.statsRow}>
            {/* Streak Badge */}
            <View style={styles.streakBadge}>
              <View style={styles.streakFlame}>
                <Text style={styles.flameEmoji}>🔥</Text>
              </View>
              <View style={styles.streakContent}>
                <Text style={styles.streakNumber}>{userProgress.streak}</Text>
                <Text style={styles.streakText}>day streak</Text>
              </View>
            </View>

            {/* Weekly Progress Pill */}
            <View style={styles.weeklyPill}>
              <Text style={styles.weeklyLabel}>This Week</Text>
              <View style={styles.weeklyProgressBar}>
                <View style={[styles.weeklyProgressFill, { 
                  width: `${getWeeklyXPPercentage()}%` 
                }]} />
              </View>
              <Text style={styles.weeklyText}>
                {userProgress.weeklyXP}/{userProgress.weeklyXPGoal} XP
              </Text>
            </View>
          </View>

          {/* Daily Goal Banner */}
          <View style={styles.goalBanner}>
            <View style={styles.goalIcon}>
              <Text style={styles.goalEmoji}>🎯</Text>
            </View>
            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>Daily Mission</Text>
              <Text style={styles.goalDescription}>
                {getRemainingLessons() > 0 
                  ? `${getRemainingLessons()} lesson${getRemainingLessons() > 1 ? 's' : ''} left to complete today!`
                  : "Mission accomplished! You're on fire! 🔥"
                }
              </Text>
            </View>
            {getRemainingLessons() === 0 && (
              <View style={styles.completeBadge}>
                <Text style={styles.completeText}>✓</Text>
              </View>
            )}
          </View>
        </View>

        {/* Achievements & Badges */}
        <View style={styles.badgesSection}>
          <View style={styles.badgesSectionHeader}>
            <Text style={styles.badgesTitle}>Your Achievements</Text>
            <TouchableOpacity style={styles.viewAllBadges}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.badgesList}
            contentContainerStyle={styles.badgesContent}
          >
            {getUnlockedBadges().slice(0, 5).map((badge) => (
              <View key={badge.id} style={styles.badgeCard}>
                <View style={styles.badgeIconContainer}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            ))}
            
            {/* Next milestone preview */}
            <View style={[styles.badgeCard, styles.lockedBadge]}>
              <View style={styles.badgeIconContainer}>
                <Text style={styles.badgeIcon}>💎</Text>
              </View>
              <Text style={styles.badgeName}>First $1,000</Text>
              <Text style={styles.badgeDescription}>Save your first $1,000</Text>
              <View style={styles.lockedOverlay}>
                <Text style={styles.badgeLockIcon}>🔒</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Curriculum Map (Main Section) */}
        <View style={styles.curriculumSection}>
          <Text style={styles.curriculumTitle}>Your Learning Path</Text>
          <Text style={styles.curriculumSubtitle}>Master financial skills step by step</Text>

          {/* Unit 1: Basics */}
          <View style={styles.unitContainer}>
            <View style={styles.unitHeader}>
              <View style={[styles.unitIcon, { backgroundColor: '#dbeafe' }]}>
                <Text style={styles.unitEmoji}>📘</Text>
              </View>
              <Text style={styles.unitTitle}>Basics</Text>
              <Text style={styles.unitProgress}>2/3 lessons</Text>
            </View>
            
            <View style={styles.lessonPath}>
              {/* Lesson 1 - Completed */}
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.completedLesson]}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.lessonTitle}>What is Money?</Text>
              </View>

              {/* Path connector */}
              <View style={styles.pathConnector} />

              {/* Lesson 2 - Completed */}
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.completedLesson]}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
                <Text style={styles.lessonTitle}>Saving vs. Spending</Text>
              </View>

              {/* Path connector */}
              <View style={styles.pathConnector} />

              {/* Lesson 3 - Current */}
              <TouchableOpacity style={styles.lessonNode} onPress={startLesson}>
                <View style={[styles.lessonIcon, styles.currentLesson]}>
                  <Text style={styles.lessonNumber}>3</Text>
                </View>
                <Text style={styles.lessonTitle}>Budgeting Basics</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Unit 2: Banking */}
          <View style={styles.unitContainer}>
            <View style={styles.unitHeader}>
              <View style={[styles.unitIcon, { backgroundColor: '#f0fdf4' }]}>
                <Text style={styles.unitEmoji}>🏦</Text>
              </View>
              <Text style={styles.unitTitle}>Banking</Text>
              <Text style={styles.unitProgress}>0/3 lessons</Text>
            </View>
            
            <View style={styles.lessonPath}>
              {/* Lesson 1 - Locked */}
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Checking vs. Savings</Text>
              </View>

              {/* Path connector - locked */}
              <View style={[styles.pathConnector, styles.lockedConnector]} />

              {/* Lesson 2 - Locked */}
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Interest Rates</Text>
              </View>

              {/* Path connector - locked */}
              <View style={[styles.pathConnector, styles.lockedConnector]} />

              {/* Lesson 3 - Locked */}
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>ATMs & Online Banking</Text>
              </View>
            </View>
          </View>

          {/* Unit 3: Credit */}
          <View style={styles.unitContainer}>
            <View style={styles.unitHeader}>
              <View style={[styles.unitIcon, { backgroundColor: '#fef3f2' }]}>
                <Text style={styles.unitEmoji}>💳</Text>
              </View>
              <Text style={styles.unitTitle}>Credit</Text>
              <Text style={styles.unitProgress}>0/3 lessons</Text>
            </View>
            
            <View style={styles.lessonPath}>
              {/* All lessons locked */}
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>How Credit Cards Work</Text>
              </View>

              <View style={[styles.pathConnector, styles.lockedConnector]} />

              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Loans & Debt</Text>
              </View>

              <View style={[styles.pathConnector, styles.lockedConnector]} />

              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Credit Scores</Text>
              </View>
            </View>
          </View>

          {/* Unit 4: Investing */}
          <View style={styles.unitContainer}>
            <View style={styles.unitHeader}>
              <View style={[styles.unitIcon, { backgroundColor: '#f0f9ff' }]}>
                <Text style={styles.unitEmoji}>📈</Text>
              </View>
              <Text style={styles.unitTitle}>Investing</Text>
              <Text style={styles.unitProgress}>0/4 lessons</Text>
            </View>
            
            <View style={styles.lessonPath}>
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Stocks vs. Bonds</Text>
              </View>

              <View style={[styles.pathConnector, styles.lockedConnector]} />

              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Compound Interest</Text>
              </View>

              <View style={[styles.pathConnector, styles.lockedConnector]} />

              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Risk & Diversification</Text>
              </View>

              <View style={[styles.pathConnector, styles.lockedConnector]} />

              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Portfolio Building</Text>
              </View>
            </View>
          </View>

          {/* Unit 5: Life Goals */}
          <View style={styles.unitContainer}>
            <View style={styles.unitHeader}>
              <View style={[styles.unitIcon, { backgroundColor: '#fefce8' }]}>
                <Text style={styles.unitEmoji}>🏡</Text>
              </View>
              <Text style={styles.unitTitle}>Life Goals</Text>
              <Text style={styles.unitProgress}>0/3 lessons</Text>
            </View>
            
            <View style={styles.lessonPath}>
              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Buying a House</Text>
              </View>

              <View style={[styles.pathConnector, styles.lockedConnector]} />

              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Retirement Planning</Text>
              </View>

              <View style={[styles.pathConnector, styles.lockedConnector]} />

              <View style={styles.lessonNode}>
                <View style={[styles.lessonIcon, styles.lockedLesson]}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
                <Text style={[styles.lessonTitle, styles.lockedText]}>Emergency Fund</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Actions removed from here - moved to fixed bottom banner */}

      </ScrollView>

      {/* Fixed Bottom Banner */}
      <View style={styles.bottomBanner}>
        <TouchableOpacity style={styles.bottomBannerButton} onPress={startLesson}>
          <View style={styles.bottomButtonContent}>
            <Ionicons name="play" size={20} color="#fff" />
            <Text style={styles.bottomButtonText}>Continue Learning</Text>
            <Text style={styles.bottomButtonSubtext}>Budgeting Basics</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bottomBannerButtonSecondary}>
          <View style={styles.bottomButtonContent}>
            <Ionicons name="refresh" size={20} color="#3b82f6" />
            <Text style={styles.bottomButtonTextSecondary}>Review Lessons</Text>
            <Text style={styles.bottomButtonSubtextSecondary}>Earn partial XP</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Lesson Modal */}
      <Modal
        visible={showLessonModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.lessonContainer}>
          {/* Lesson Header */}
          <View style={styles.lessonHeader}>
            <TouchableOpacity 
              onPress={() => setShowLessonModal(false)} 
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
            <View style={styles.progressIndicator}>
              {[0, 1, 2, 3, 4].map((step) => (
                <View
                  key={step}
                  style={[
                    styles.progressDot,
                    lessonStep >= step ? styles.progressDotActive : styles.progressDotInactive
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Lesson Content */}
          <ScrollView style={styles.lessonContent}>
            {lessonStep === 0 && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>Budgeting Basics</Text>
                <Text style={styles.lessonIntro}>
                  A budget is like a roadmap for your money. It helps you plan where every dollar goes before you spend it. 
                  Think of it as telling your money what to do instead of wondering where it went! 💰
                </Text>
                <TouchableOpacity 
                  style={styles.continueButton} 
                  onPress={() => setLessonStep(1)}
                >
                  <Text style={styles.continueButtonText}>Let's Learn!</Text>
                </TouchableOpacity>
              </View>
            )}

            {lessonStep === 1 && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>Quick Check ✅</Text>
                <Text style={styles.quizQuestion}>
                  What is the main purpose of a budget?
                </Text>
                <View style={styles.quizOptions}>
                  <TouchableOpacity style={styles.quizOption}>
                    <Text style={styles.quizOptionText}>To limit all spending</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quizOption, styles.quizOptionSelected]}>
                    <Text style={[styles.quizOptionText, styles.quizOptionTextSelected]}>
                      To plan and track your money
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.quizOption}>
                    <Text style={styles.quizOptionText}>To make you feel guilty</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.quizExplanation}>
                  <Text style={styles.explanationTitle}>Correct! 🎉</Text>
                  <Text style={styles.explanationText}>
                    A budget helps you plan where your money goes and track your spending, giving you control over your finances.
                  </Text>
                  <TouchableOpacity 
                    style={styles.continueButton} 
                    onPress={() => setLessonStep(2)}
                  >
                    <Text style={styles.continueButtonText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {lessonStep === 2 && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>Real-Life Scenario 🎭</Text>
                <Text style={styles.scenarioSetup}>
                  You just received $100 for your birthday! What's the smartest thing to do?
                </Text>
                <View style={styles.scenarioChoices}>
                  <TouchableOpacity style={styles.scenarioChoice}>
                    <Text style={styles.scenarioChoiceText}>Spend it all on new sneakers</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.scenarioChoice, styles.scenarioChoiceSelected]}>
                    <Text style={[styles.scenarioChoiceText, styles.scenarioChoiceTextSelected]}>
                      Save $50, spend $50 on something fun
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.scenarioChoice}>
                    <Text style={styles.scenarioChoiceText}>Save it all for later</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.scenarioOutcome}>
                  <Text style={styles.outcomeTitle}>What happens next...</Text>
                  <Text style={styles.outcomeText}>
                    Smart balance! You enjoy some of your money now while building savings for the future. This is how wealth is built! 💪
                  </Text>
                  <TouchableOpacity 
                    style={styles.continueButton} 
                    onPress={() => setLessonStep(3)}
                  >
                    <Text style={styles.continueButtonText}>See Reward</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {lessonStep === 3 && (
              <View style={styles.lessonStep}>
                <View style={styles.rewardContainer}>
                  <Text style={styles.rewardTitle}>Great Job! 🎉</Text>
                  <View style={styles.rewardsRow}>
                    <View style={styles.xpReward}>
                      <Text style={styles.rewardIcon}>⭐</Text>
                      <Text style={styles.xpRewardText}>+25 XP</Text>
                    </View>
                    <View style={styles.coinReward}>
                      <Text style={styles.rewardIcon}>🪙</Text>
                      <Text style={styles.coinRewardText}>+10 Coins</Text>
                    </View>
                  </View>
                  <Text style={styles.rewardSubtitle}>You're building great financial habits!</Text>
                  <TouchableOpacity 
                    style={styles.continueButton} 
                    onPress={() => setLessonStep(4)}
                  >
                    <Text style={styles.continueButtonText}>See Key Takeaway</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {lessonStep === 4 && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>Key Takeaway 💡</Text>
                <View style={styles.takeawayCard}>
                  <Text style={styles.takeawayText}>
                    "Budgeting gives you control over your money and helps you balance enjoying today while preparing for tomorrow."
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.completeButton} 
                  onPress={completeLesson}
                >
                  <Text style={styles.completeButtonText}>Complete Lesson</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Badge Achievement Modal */}
      <Modal
        visible={showBadgeModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowBadgeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.badgeModal}>
            <Text style={styles.badgeModalTitle}>🎉 Achievement Unlocked!</Text>
            {newBadge && (
              <>
                <View style={styles.newBadgeIcon}>
                  <Text style={styles.newBadgeEmoji}>{newBadge.icon}</Text>
                </View>
                <Text style={styles.newBadgeName}>{newBadge.name}</Text>
                <Text style={styles.newBadgeDescription}>{newBadge.description}</Text>
              </>
            )}
            <TouchableOpacity 
              style={styles.badgeModalButton} 
              onPress={() => setShowBadgeModal(false)}
            >
              <Text style={styles.badgeModalButtonText}>Awesome!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Level Up Modal */}
      <Modal
        visible={showLevelUp}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLevelUp(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.levelUpModal}>
            <Text style={styles.levelUpTitle}>🚀 Level Up!</Text>
            <Text style={styles.levelUpText}>
              Congratulations! You've reached Level {userProgress.level + 1}
            </Text>
            <Text style={styles.levelUpSubtext}>
              New financial concepts are now unlocked!
            </Text>
            <TouchableOpacity 
              style={styles.levelUpButton} 
              onPress={() => setShowLevelUp(false)}
            >
              <Text style={styles.levelUpButtonText}>Continue Learning</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LearnScreen;
