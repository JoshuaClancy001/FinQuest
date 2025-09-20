import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';
import { Courses, Lesson } from '../../lessons';
import { useUser } from '../../contexts/UserContext';

interface LearnScreenCurriculumProps {
  startLesson: (lesson?: Lesson) => void;
}

const LearnScreenCurriculum: React.FC<LearnScreenCurriculumProps> = ({ startLesson }) => {
  // Get user context for lesson progress
  const { user } = useUser();
  
  // State to track which categories are expanded (default: first category expanded)
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>(() => {
    const categoryNames = Object.keys(Courses);
    const initialState: {[key: string]: boolean} = {};
    categoryNames.forEach((name, index) => {
      initialState[name] = index === 0; // Only first category expanded by default
    });
    return initialState;
  });

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Function to determine if a lesson is unlocked
  const isLessonUnlocked = (categoryName: string, lessonIndex: number): boolean => {
    if (!user?.currentLessons) return lessonIndex === 0; // If no progress, only first lesson unlocked
    
    const currentLessonNumber = user.currentLessons[categoryName] || 1;
    // Lessons are unlocked up to and including the current lesson (lessonIndex + 1 because index is 0-based)
    return (lessonIndex + 1) <= currentLessonNumber;
  };

  // Function to get lesson status
  const getLessonStatus = (categoryName: string, lessonIndex: number): 'completed' | 'current' | 'locked' => {
    if (!user?.currentLessons) {
      return lessonIndex === 0 ? 'current' : 'locked';
    }
    
    const currentLessonNumber = user.currentLessons[categoryName] || 1;
    const lessonNumber = lessonIndex + 1; // Convert 0-based index to 1-based lesson number
    
    if (lessonNumber < currentLessonNumber) {
      return 'completed';
    } else if (lessonNumber === currentLessonNumber) {
      return 'current';
    } else {
      return 'locked';
    }
  };

  return (
    <View style={styles.curriculumSection}>
      <Text style={styles.curriculumTitle}>Your Learning Path</Text>
      <Text style={styles.curriculumSubtitle}>Master financial skills step by step</Text>

      {/* Dynamic Course Units */}
      {Object.entries(Courses).map(([categoryName, lessons], categoryIndex) => {
        const categoryEmojis = ['📘', '💰', '🎯', '📈', '🏆'];
        const categoryColors = ['#dbeafe', '#f0fdf4', '#fef3c7', '#ede9fe', '#fef2f2'];
        const isExpanded = expandedCategories[categoryName];
        
        // Calculate progress for this category
        const currentLessonNumber = user?.currentLessons?.[categoryName] || 1;
        const completedLessons = Math.max(0, currentLessonNumber - 1); // Lessons completed (current lesson is in progress)
        const progressText = `${completedLessons}/${lessons.length} lessons`;
        
        return (
          <View key={categoryName} style={styles.unitContainer}>
            <TouchableOpacity 
              style={styles.unitHeader} 
              onPress={() => toggleCategory(categoryName)}
              activeOpacity={0.7}
            >
              <View style={[styles.unitIcon, { backgroundColor: categoryColors[categoryIndex] }]}>
                <Text style={styles.unitEmoji}>{categoryEmojis[categoryIndex]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.unitTitle}>{categoryName}</Text>
                <Text style={styles.unitProgress}>{progressText}</Text>
              </View>
              <Ionicons 
                name={isExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666" 
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
            
            {isExpanded && (
              <View style={styles.lessonPath}>
              {lessons.map((lesson, lessonIndex) => {
                const lessonStatus = getLessonStatus(categoryName, lessonIndex);
                const isUnlocked = isLessonUnlocked(categoryName, lessonIndex);
                
                return (
                  <View key={`${categoryName}-${lessonIndex}`}>
                    <TouchableOpacity 
                      style={[
                        styles.lessonNode,
                        !isUnlocked && styles.lockedLessonNode
                      ]} 
                      onPress={() => {
                        if (isUnlocked) {
                          startLesson(lesson);
                        }
                      }}
                      disabled={!isUnlocked}
                      activeOpacity={isUnlocked ? 0.7 : 1}
                    >
                      <View style={[
                        styles.lessonIcon, 
                        lessonStatus === 'completed' && styles.completedLesson,
                        lessonStatus === 'current' && styles.currentLesson,
                        lessonStatus === 'locked' && styles.lockedLesson
                      ]}>
                        {lessonStatus === 'completed' && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                        {lessonStatus === 'current' && (
                          <Ionicons name="play" size={16} color="#fff" />
                        )}
                        {lessonStatus === 'locked' && (
                          <Ionicons name="lock-closed" size={16} color="#999" />
                        )}
                      </View>
                      <Text style={[
                        styles.lessonTitle,
                        !isUnlocked && styles.lockedLessonTitle
                      ]}>
                        {lesson.getLessonName()}
                      </Text>
                    </TouchableOpacity>
                    
                    {lessonIndex < lessons.length - 1 && (
                      <View style={[
                        styles.pathConnector,
                        !isLessonUnlocked(categoryName, lessonIndex + 1) && styles.lockedPathConnector
                      ]} />
                    )}
                  </View>
                );
              })}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default LearnScreenCurriculum;
