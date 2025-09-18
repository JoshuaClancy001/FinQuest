import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';
import { Courses, Lesson } from '../../lessons';

interface LearnScreenCurriculumProps {
  startLesson: (lesson?: Lesson) => void;
}

const LearnScreenCurriculum: React.FC<LearnScreenCurriculumProps> = ({ startLesson }) => {
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

  return (
    <View style={styles.curriculumSection}>
      <Text style={styles.curriculumTitle}>Your Learning Path</Text>
      <Text style={styles.curriculumSubtitle}>Master financial skills step by step</Text>

      {/* Dynamic Course Units */}
      {Object.entries(Courses).map(([categoryName, lessons], categoryIndex) => {
        const categoryEmojis = ['📘', '💰', '🎯', '📈', '🏆'];
        const categoryColors = ['#dbeafe', '#f0fdf4', '#fef3c7', '#ede9fe', '#fef2f2'];
        const isExpanded = expandedCategories[categoryName];
        
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
                <Text style={styles.unitProgress}>0/{lessons.length} lessons</Text>
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
              {lessons.map((lesson, lessonIndex) => (
                <View key={`${categoryName}-${lessonIndex}`}>
                  <TouchableOpacity 
                    style={styles.lessonNode} 
                    onPress={() => startLesson(lesson)}
                  >
                    <View style={[styles.lessonIcon, styles.currentLesson]}>
                      <Ionicons name="play" size={16} color="#fff" />
                    </View>
                    <Text style={styles.lessonTitle}>{lesson.getLessonName()}</Text>
                  </TouchableOpacity>
                  
                  {lessonIndex < lessons.length - 1 && (
                    <View style={styles.pathConnector} />
                  )}
                </View>
              ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default LearnScreenCurriculum;
