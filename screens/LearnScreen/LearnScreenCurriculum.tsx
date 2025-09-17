import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';
import { Courses, Lesson } from '../../lessons';

interface LearnScreenCurriculumProps {
  startLesson: (lesson?: Lesson) => void;
}

const LearnScreenCurriculum: React.FC<LearnScreenCurriculumProps> = ({ startLesson }) => {
  return (
    <View style={styles.curriculumSection}>
      <Text style={styles.curriculumTitle}>Your Learning Path</Text>
      <Text style={styles.curriculumSubtitle}>Master financial skills step by step</Text>

      {/* Dynamic Course Units */}
      {Object.entries(Courses).map(([categoryName, lessons], categoryIndex) => {
        const categoryEmojis = ['📘', '💰', '🎯', '📈', '🏆'];
        const categoryColors = ['#dbeafe', '#f0fdf4', '#fef3c7', '#ede9fe', '#fef2f2'];
        
        return (
          <View key={categoryName} style={styles.unitContainer}>
            <View style={styles.unitHeader}>
              <View style={[styles.unitIcon, { backgroundColor: categoryColors[categoryIndex] }]}>
                <Text style={styles.unitEmoji}>{categoryEmojis[categoryIndex]}</Text>
              </View>
              <Text style={styles.unitTitle}>{categoryName}</Text>
              <Text style={styles.unitProgress}>0/{lessons.length} lessons</Text>
            </View>
            
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
          </View>
        );
      })}
    </View>
  );
};

export default LearnScreenCurriculum;
