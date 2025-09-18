import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeScreenStyles as styles } from '../../../styles/HomeScreenStyles';
import HomeScreenProfileModal from './HomeScreenProfileModal';
import HomeScreenSimulationModal, { SimulationState, SimulationStep } from './HomeScreenSimulationModal';

export interface CourseCategory {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  description: string;
}

interface HomeScreenModalsProps {
  // Profile Modal Props
  showProfileModal: boolean;
  onCloseProfileModal: () => void;
  
  // Simulation Modal Props
  showSimulationModal: boolean;
  currentStep: number;
  simulationState: SimulationState;
  simulationSteps: SimulationStep[];
  onCloseSimulationModal: () => void;
  onSimulationStepAction: (action: () => void) => void;
  onSimulationNextStep: () => void;

  // Category Modal Props
  showCategoryModal: boolean;
  onCloseCategoryModal: () => void;
  courseCategories: CourseCategory[];
  onCategorySelect: (category: string) => void;
  userCurrentLessons?: { [category: string]: number };
}

export default function HomeScreenModals({
  showProfileModal,
  onCloseProfileModal,
  showSimulationModal,
  currentStep,
  simulationState,
  simulationSteps,
  onCloseSimulationModal,
  onSimulationStepAction,
  onSimulationNextStep,
  showCategoryModal,
  onCloseCategoryModal,
  courseCategories,
  onCategorySelect,
  userCurrentLessons
}: HomeScreenModalsProps): React.JSX.Element {
  
  return (
    <>
      <HomeScreenProfileModal
        visible={showProfileModal}
        onClose={onCloseProfileModal}
      />
      
      <HomeScreenSimulationModal
        visible={showSimulationModal}
        currentStep={currentStep}
        simulationState={simulationState}
        simulationSteps={simulationSteps}
        onClose={onCloseSimulationModal}
        onStepAction={onSimulationStepAction}
        onNextStep={onSimulationNextStep}
      />

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={onCloseCategoryModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.profileModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Learning Path</Text>
              <TouchableOpacity 
                onPress={onCloseCategoryModal}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalOptionSubtitle, { marginBottom: 20, fontSize: 16, textAlign: 'center' }]}>
                Select a financial topic to continue your learning journey
              </Text>

              {courseCategories.map((category, index) => {
                const currentLessonNumber = userCurrentLessons?.[category.name] ?? 0;
                const totalLessons = 3; // Each category has 3 lessons
                const progressText = `Lesson ${currentLessonNumber} of ${totalLessons}`;
                
                return (
                  <TouchableOpacity 
                    key={index}
                    style={[styles.modalOption, { marginBottom: 15 }]}
                    onPress={() => onCategorySelect(category.name)}
                  >
                    <View style={[styles.modalOptionIcon, { backgroundColor: `${category.color}20` }]}>
                      <Ionicons name={category.icon} size={24} color={category.color} />
                    </View>
                    <View style={styles.modalOptionText}>
                      <Text style={styles.modalOptionTitle}>{category.name}</Text>
                      <Text style={styles.modalOptionSubtitle}>{category.description}</Text>
                      <Text style={[styles.modalOptionSubtitle, { fontSize: 12, color: category.color, fontWeight: '600', marginTop: 4 }]}>
                        {progressText}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Ionicons name="chevron-forward" size={20} color="#666" />
                      <Text style={{ fontSize: 10, color: '#999', marginTop: 2 }}>Continue</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Export types for convenience
export type { SimulationState, SimulationStep } from './HomeScreenSimulationModal';
