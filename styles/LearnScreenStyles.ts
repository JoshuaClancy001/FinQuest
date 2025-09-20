import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export const learnScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  headerSection: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  // Hero Section
  heroContainer: {
    backgroundColor: '#667eea', // Gradient fallback for React Native
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  heroContent: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 20,
  },

  heroStats: {
    alignItems: 'flex-end',
    gap: 8,
  },

  levelBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  levelText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 4,
  },

  coinIcon: {
    fontSize: 16,
  },

  coinText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },

  motivationText: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '500',
  },

  // Circular Progress
  circularProgressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  circularProgress: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  circularProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#10b981',
    transformOrigin: 'right center',
  },

  circularProgressInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  xpNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  xpLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginTop: 2,
  },

  xpGoal: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },

  levelProgressContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },

  levelProgressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },

  levelProgressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },

  levelProgressFill: {
    height: '100%',
    backgroundColor: '#fbbf24',
    borderRadius: 4,
  },

  levelProgressXP: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },

  // Streak Badge
  streakBadge: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#ff6b35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  streakFlame: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fef3f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  flameEmoji: {
    fontSize: 24,
  },

  streakContent: {
    flex: 1,
  },

  streakNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b35',
    lineHeight: 28,
  },

  streakText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Weekly Pill
  weeklyPill: {
    flex: 1.2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  weeklyLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },

  weeklyProgressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },

  weeklyProgressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },

  weeklyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  // Goal Banner
  goalBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fef7ff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e879f9',
  },

  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3e8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },

  goalEmoji: {
    fontSize: 24,
  },

  goalContent: {
    flex: 1,
  },

  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 4,
  },

  goalDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },

  completeBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },

  completeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Badges Section
  badgesSection: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  badgesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  badgesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  viewAllBadges: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },

  badgesList: {
    marginHorizontal: -20,
  },

  badgesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },

  badgeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: 140,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  lockedBadge: {
    opacity: 0.6,
    borderColor: '#d1d5db',
    position: 'relative',
  },

  badgeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  badgeIcon: {
    fontSize: 28,
  },

  badgeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 4,
  },

  badgeDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },

  lockedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 4,
  },

  badgeLockIcon: {
    fontSize: 16,
  },

  // Legacy styles (keeping for backward compatibility)
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },

  progressOverview: {
    marginBottom: 24,
  },

  progressCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  progressValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },

  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 4,
  },

  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    minWidth: 40,
    textAlign: 'right',
  },

  streakGoalContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  streakCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  streakIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fef3f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  streakInfo: {
    flex: 1,
  },

  streakLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },

  goalCard: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  goalText: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },

  // Additional styles for other sections
  sectionContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },

  courseContainer: {
    marginBottom: 16,
  },

  courseCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },

  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },

  courseDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },

  courseProgress: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },

  actionContainer: {
    marginTop: 16,
  },

  actionButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  secondaryButtonText: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '600',
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  // Curriculum Map Section
  curriculumSection: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  curriculumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  curriculumSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },

  // Unit Styles
  unitContainer: {
    marginBottom: 32,
  },

  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },

  unitIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  unitEmoji: {
    fontSize: 28,
  },

  unitTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  unitProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  // Lesson Path Styles
  lessonPath: {
    paddingLeft: 28,
  },

  lessonNode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  lessonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  completedLesson: {
    backgroundColor: '#10b981',
    borderColor: '#059669',
  },

  currentLesson: {
    backgroundColor: '#3b82f6',
    borderColor: '#2563eb',
  },

  lockedLesson: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },

  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  lessonNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  lockIcon: {
    fontSize: 16,
    color: '#9ca3af',
  },

  lessonTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },

  lockedLessonNode: {
    opacity: 0.6,
  },

  lockedLessonTitle: {
    color: '#9ca3af',
  },

  lockedText: {
    color: '#9ca3af',
  },

  // Path Connector
  pathConnector: {
    width: 3,
    height: 24,
    backgroundColor: '#10b981',
    marginLeft: 22.5,
    marginBottom: 4,
  },

  lockedPathConnector: {
    backgroundColor: '#d1d5db',
  },

  lockedConnector: {
    backgroundColor: '#d1d5db',
  },

  // Lesson Modal Styles
  lessonContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  closeButton: {
    padding: 8,
  },

  progressIndicator: {
    flexDirection: 'row',
    gap: 8,
  },

  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  progressDotActive: {
    backgroundColor: '#3b82f6',
  },

  progressDotInactive: {
    backgroundColor: '#d1d5db',
  },

  lessonContent: {
    flex: 1,
    paddingHorizontal: 20,
  },

  lessonStep: {
    paddingVertical: 32,
  },

  lessonStepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },

  lessonIntro: {
    fontSize: 18,
    lineHeight: 28,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 32,
  },

  continueButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 24,
  },

  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Quiz Styles
  quizQuestion: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 24,
  },

  quizOptions: {
    gap: 12,
  },

  quizOption: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },

  quizOptionSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },

  quizOptionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },

  quizOptionTextSelected: {
    color: '#3b82f6',
    fontWeight: '600',
  },

  quizExplanation: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
  },

  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },

  explanationText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'center',
  },

  // Scenario Styles
  scenarioSetup: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 26,
  },

  scenarioChoices: {
    gap: 12,
  },

  scenarioChoice: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },

  scenarioChoiceSelected: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },

  scenarioChoiceText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },

  scenarioChoiceTextSelected: {
    color: '#10b981',
    fontWeight: '600',
  },

  scenarioOutcome: {
    backgroundColor: '#fef7ff',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
  },

  outcomeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7c3aed',
    marginBottom: 12,
    textAlign: 'center',
  },

  outcomeText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    textAlign: 'center',
  },

  // Reward Styles
  rewardContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },

  rewardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
  },

  xpReward: {
    backgroundColor: '#10b981',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },

  coinReward: {
    backgroundColor: '#f59e0b',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rewardIcon: {
    fontSize: 24,
    marginBottom: 4,
  },

  xpRewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  coinRewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  rewardSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Takeaway Styles
  takeawayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  takeawayText: {
    fontSize: 18,
    color: '#374151',
    lineHeight: 26,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  completeButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },

  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Fixed Bottom Banner
  bottomBanner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12, // Account for home indicator
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  bottomBannerButton: {
    flex: 2,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
  },

  bottomBannerButtonSecondary: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  bottomButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },

  bottomButtonSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
    textAlign: 'center',
  },

  bottomButtonTextSecondary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    marginTop: 4,
    textAlign: 'center',
  },

  bottomButtonSubtextSecondary: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
    textAlign: 'center',
  },

  // Gamification Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // Badge Achievement Modal
  badgeModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  badgeModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },

  newBadgeIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  newBadgeEmoji: {
    fontSize: 48,
  },

  newBadgeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  newBadgeDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  badgeModalButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  badgeModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Level Up Modal
  levelUpModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  levelUpTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },

  levelUpText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: 8,
  },

  levelUpSubtext: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  levelUpButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  levelUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});