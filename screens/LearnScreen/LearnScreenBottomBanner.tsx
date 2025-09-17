import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { learnScreenStyles as styles } from '../../styles/LearnScreenStyles';
import { Courses, Lesson } from '../../lessons';

interface LearnScreenBottomBannerProps {
  startLesson: (lesson?: Lesson) => void;
}

const LearnScreenBottomBanner: React.FC<LearnScreenBottomBannerProps> = ({ startLesson }) => {
  return (
    <View style={styles.bottomBanner}>
      <TouchableOpacity style={styles.bottomBannerButton} onPress={() => startLesson(Courses["Financial Basics"][0])}>
        <View style={styles.bottomButtonContent}>
          <Ionicons name="play" size={20} color="#fff" />
          <Text style={styles.bottomButtonText}>Continue Learning</Text>
          <Text style={styles.bottomButtonSubtext}>{Courses["Financial Basics"][0].getLessonName()}</Text>
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
  );
};

export default LearnScreenBottomBanner;
