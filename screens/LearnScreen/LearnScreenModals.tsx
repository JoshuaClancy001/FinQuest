import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';
import { Lesson } from '../../lessons';

interface LearnScreenModalsProps {
  // Lesson Modal props
  showLessonModal: boolean;
  setShowLessonModal: (show: boolean) => void;
  lessonStep: number;
  setLessonStep: (step: number) => void;
  currentLesson: Lesson | null;
  currentQuestionIndex: number;
  selectedQuizAnswer: number | null;
  showQuizResult: boolean;
  selectedScenarioChoice: number | null;
  showScenarioResult: boolean;
  handleQuizAnswer: (answerIndex: number) => void;
  nextQuestion: () => void;
  handleScenarioChoice: (choiceIndex: number) => void;
  handleCoinXpAwarding: () => void;
  completeLesson: () => void;
  
  // Badge Modal props
  showBadgeModal: boolean;
  setShowBadgeModal: (show: boolean) => void;
  newBadge: any;
  
  // Level Up Modal props
  showLevelUp: boolean;
  setShowLevelUp: (show: boolean) => void;
  userProgress: any;
}

const LearnScreenModals: React.FC<LearnScreenModalsProps> = ({
  showLessonModal,
  setShowLessonModal,
  lessonStep,
  setLessonStep,
  currentLesson,
  currentQuestionIndex,
  selectedQuizAnswer,
  showQuizResult,
  selectedScenarioChoice,
  showScenarioResult,
  handleQuizAnswer,
  nextQuestion,
  handleScenarioChoice,
  handleCoinXpAwarding,
  completeLesson,
  showBadgeModal,
  setShowBadgeModal,
  newBadge,
  showLevelUp,
  setShowLevelUp,
  userProgress
}) => {
  return (
    <>
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
            {lessonStep === 0 && currentLesson && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>{currentLesson.getLessonName()}</Text>
                <Text style={styles.lessonIntro}>
                  Welcome to this lesson on {currentLesson.getLessonName()}! Let's explore this important financial concept together. 💰
                </Text>
                <TouchableOpacity 
                  style={styles.continueButton} 
                  onPress={() => setLessonStep(1)}
                >
                  <Text style={styles.continueButtonText}>Let's Learn!</Text>
                </TouchableOpacity>
              </View>
            )}

            {lessonStep === 1 && currentLesson && currentLesson.getQuestions().length > 0 && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>Quick Check ✅</Text>
                <Text style={styles.quizQuestion}>
                  {currentLesson.getQuestions()[currentQuestionIndex].getQuestion()}
                </Text>
                <View style={styles.quizOptions}>
                  {currentLesson.getQuestions()[currentQuestionIndex].getAnswerChoices().map((choice: string, index: number) => (
                    <TouchableOpacity 
                      key={index}
                      style={[
                        styles.quizOption,
                        selectedQuizAnswer === index ? styles.quizOptionSelected : null
                      ]}
                      onPress={() => handleQuizAnswer(index)}
                    >
                      <Text style={[
                        styles.quizOptionText,
                        selectedQuizAnswer === index ? styles.quizOptionTextSelected : null
                      ]}>{choice}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                
                {showQuizResult && (
                  <View style={styles.quizExplanation}>
                    <Text style={styles.explanationTitle}>
                      {selectedQuizAnswer !== null && currentLesson.getQuestions()[currentQuestionIndex].getAnswerChoices()[selectedQuizAnswer] === currentLesson.getQuestions()[currentQuestionIndex].getCorrectAnswer() ? "Correct! 🎉" : "Not quite! 🤔"}
                    </Text>
                    <Text style={styles.explanationText}>
                      The correct answer is: {currentLesson.getQuestions()[currentQuestionIndex].getCorrectAnswer()}
                    </Text>
                    <TouchableOpacity 
                      style={styles.continueButton} 
                      onPress={nextQuestion}
                    >
                      <Text style={styles.continueButtonText}>
                        {currentLesson && currentQuestionIndex < currentLesson.getQuestions().length - 1 ? "Next Question" : "Continue"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {lessonStep === 2 && currentLesson && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>Practice Scenario 🎭</Text>
                <Text style={styles.scenarioSetup}>
                  Let's apply what you've learned about {currentLesson.getLessonName()}! 
                  {currentLesson.getQuestions().length > 1 && (
                    <Text>
                      {"\n\n"}
                      {currentLesson.getQuestions()[1].getQuestion()}
                    </Text>
                  )}
                </Text>
                
                {currentLesson.getQuestions().length > 1 && (
                  <View style={styles.scenarioChoices}>
                    {currentLesson.getQuestions()[1].getAnswerChoices().map((choice: string, index: number) => (
                      <TouchableOpacity 
                        key={index}
                        style={[
                          styles.scenarioChoice,
                          selectedScenarioChoice === index ? styles.scenarioChoiceSelected : null
                        ]}
                        onPress={() => handleScenarioChoice(index)}
                      >
                        <Text style={[
                          styles.scenarioChoiceText,
                          selectedScenarioChoice === index ? styles.scenarioChoiceTextSelected : null
                        ]}>{choice}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                {showScenarioResult && (
                  <View style={styles.scenarioOutcome}>
                    <Text style={styles.outcomeTitle}>Great choice!</Text>
                    <Text style={styles.outcomeText}>
                      You've successfully applied the concepts from {currentLesson.getLessonName()}! 
                      This kind of thinking will help you make better financial decisions. 💪
                    </Text>
                    <TouchableOpacity 
                      style={styles.continueButton} 
                      onPress={() => setLessonStep(3)}
                    >
                      <Text style={styles.continueButtonText}>See Reward</Text>
                    </TouchableOpacity>
                  </View>
                )}
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
                    onPress={handleCoinXpAwarding}
                  >
                    <Text style={styles.continueButtonText}>See Key Takeaway</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {lessonStep === 4 && currentLesson && (
              <View style={styles.lessonStep}>
                <Text style={styles.lessonStepTitle}>Key Takeaway 💡</Text>
                <View style={styles.takeawayCard}>
                  <Text style={styles.takeawayText}>
                    "You've successfully completed the lesson on {currentLesson.getLessonName()}! This knowledge will help you make better financial decisions in your daily life."
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
    </>
  );
};

export default LearnScreenModals;
