import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

export const leaderboardScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  // Header Section
  headerSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: isTablet ? 32 : 28,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },

  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },

  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    gap: 4,
  },

  socialButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },

  headerStats: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 20,
  },

  statItem: {
    alignItems: 'center',
  },

  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },

  statValue: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },

  // View Tabs
  viewTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },

  viewTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },

  viewTabActive: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  viewTabText: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '500',
    color: '#6b7280',
  },

  viewTabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },

  // Timeframe Filters
  timeframeFilters: {
    flexDirection: 'row',
    gap: 8,
  },

  timeframeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    gap: 6,
  },

  timeframeButtonActive: {
    backgroundColor: '#007AFF',
  },

  timeframeButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },

  timeframeButtonTextActive: {
    color: '#fff',
  },

  // Leaderboard Container
  leaderboardContainer: {
    flex: 1,
  },

  leaderboardContent: {
    paddingVertical: 20,
    paddingBottom: 20, // Reduced since we have sticky position
  },

  // Player Cards
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
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

  playerCardHighlight: {
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },

  topThreeCard: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },

  // Rank Badge
  rankBadge: {
    width: isTablet ? 50 : 44,
    height: isTablet ? 50 : 44,
    borderRadius: isTablet ? 25 : 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },

  topThreeRankBadge: {
    backgroundColor: '#fef3c7',
  },

  yourRankBadge: {
    backgroundColor: '#dbeafe',
  },

  rankNumber: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#374151',
  },

  yourRankNumber: {
    color: '#007AFF',
  },

  // Player Info
  playerInfo: {
    flex: 1,
    marginRight: 12,
  },

  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  playerAvatar: {
    fontSize: isTablet ? 32 : 28,
    marginRight: 12,
  },

  playerDetails: {
    flex: 1,
  },

  playerName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },

  yourPlayerName: {
    color: '#007AFF',
  },

  playerLevel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },

  playerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  playerNetWorth: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#059669',
  },

  playerXP: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Change Indicator
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Sticky User Position
  stickyUserPosition: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  userPositionHeader: {
    marginBottom: 12,
  },

  userPositionTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },

  nearbyCompetitors: {
    gap: 8,
  },

  competitorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },

  currentUserRow: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },

  competitorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  competitorAvatar: {
    fontSize: isTablet ? 24 : 20,
    marginRight: 12,
  },

  competitorDetails: {
    flex: 1,
  },

  competitorName: {
    fontSize: isTablet ? 14 : 12,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },

  currentUserName: {
    color: '#1d4ed8',
  },

  competitorValue: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },

  competitorGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  gapText: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '500',
  },

  levelBadge: {
    backgroundColor: '#f59e0b',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },

  levelBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },

  // Gamification Styles
  gamificationSection: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },

  // Dynamic Event Banner
  dynamicEventBanner: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  eventIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  eventInfo: {
    flex: 1,
  },

  eventTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 2,
  },

  eventDescription: {
    fontSize: 12,
    color: '#7f1d1d',
  },

  eventTimer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  eventTimeLeft: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ef4444',
  },

  eventLeaderboard: {
    gap: 8,
  },

  eventPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 12,
  },

  eventPlayerRowHighlight: {
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },

  eventRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    width: 24,
  },

  eventAvatar: {
    fontSize: 16,
  },

  eventPlayerName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },

  eventYourName: {
    color: '#1d4ed8',
  },

  eventLoss: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ef4444',
    width: 40,
    textAlign: 'right',
  },

  eventNetWorth: {
    fontSize: 11,
    color: '#6b7280',
    width: 60,
    textAlign: 'right',
  },

  // Badges
  badgesContainer: {
    marginBottom: 20,
  },

  badgesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    gap: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  badgeIcon: {
    fontSize: 16,
  },

  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },

  earnMoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    gap: 6,
  },

  earnMoreText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },

  // Challenges
  challengesContainer: {
    marginBottom: 20,
  },

  challengeCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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

  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  challengeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  challengeInfo: {
    flex: 1,
  },

  challengeTitle: {
    fontSize: isTablet ? 14 : 12,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },

  challengeDescription: {
    fontSize: 11,
    color: '#6b7280',
  },

  challengeReward: {
    alignItems: 'flex-end',
  },

  rewardAmount: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#f59e0b',
  },

  rewardCurrency: {
    fontSize: 10,
    color: '#6b7280',
  },

  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },

  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 3,
  },

  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    width: 32,
    textAlign: 'right',
  },

  challengeFooter: {
    alignItems: 'flex-end',
  },

  timeLeftText: {
    fontSize: 10,
    color: '#6b7280',
    fontStyle: 'italic',
  },

  // Regular Leaderboard
  regularLeaderboard: {
    marginTop: 8,
  },

  // Player enhancements
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  playerBadges: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 2,
  },

  miniBadge: {
    fontSize: 12,
  },

  // Social Modals
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  modalTitle: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  modalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },

  // Challenge Templates
  challengeTemplate: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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

  challengeTemplateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  challengeTemplateIcon: {
    fontSize: 32,
    marginRight: 16,
  },

  challengeTemplateInfo: {
    flex: 1,
  },

  challengeTemplateTitle: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },

  challengeTemplateDescription: {
    fontSize: 12,
    color: '#6b7280',
  },

  challengeTemplateDetails: {
    gap: 8,
  },

  challengeTemplateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  challengeTemplateLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },

  challengeTemplateValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },

  // Share Modal
  sharePreview: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
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

  shareMessage: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },

  shareStats: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8,
  },

  shareHashtags: {
    fontSize: 12,
    color: '#3b82f6',
    textAlign: 'center',
  },

  shareOptions: {
    gap: 12,
  },

  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  shareButtonText: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },

  // Legacy styles (kept for compatibility)
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
