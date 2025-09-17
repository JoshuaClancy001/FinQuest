import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeScreenStyles as styles } from '../../../styles/HomeScreenStyles';

interface SimulationState {
  cash: number;
  savings: number;
  debt: number;
  stress: number;
  canWork: boolean;
}

interface SimulationOption {
  text: string;
  action: () => void;
}

interface SimulationStep {
  title: string;
  description: string;
  options: SimulationOption[];
}

interface HomeScreenSimulationModalProps {
  visible: boolean;
  currentStep: number;
  simulationState: SimulationState;
  simulationSteps: SimulationStep[];
  onClose: () => void;
  onStepAction: (action: () => void) => void;
  onNextStep: () => void;
}

export default function HomeScreenSimulationModal({ 
  visible, 
  currentStep, 
  simulationState, 
  simulationSteps, 
  onClose, 
  onStepAction,
  onNextStep 
}: HomeScreenSimulationModalProps): React.JSX.Element {

  const handleOptionPress = (option: SimulationOption) => {
    onStepAction(option.action);
    onNextStep();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.profileModal, { maxHeight: '80%' }]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Step {currentStep + 1}/9: {simulationSteps[currentStep]?.title}
            </Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <Text style={[styles.modalOptionSubtitle, { marginBottom: 20, fontSize: 16 }]}>
              {simulationSteps[currentStep]?.description}
            </Text>

            {/* Current Financial State */}
            <View style={{
              backgroundColor: '#f8f9fa',
              padding: 15,
              borderRadius: 8,
              marginBottom: 20
            }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Your Current State:</Text>
              <Text>💰 Cash: ${simulationState.cash}</Text>
              <Text>🏦 Savings: ${simulationState.savings}</Text>
              <Text>💳 Debt: ${simulationState.debt}</Text>
              <Text>😰 Stress: {simulationState.stress}/100</Text>
              <Text>🚗 Can Work: {simulationState.canWork ? 'Yes' : 'No'}</Text>
            </View>

            {/* Options */}
            {simulationSteps[currentStep]?.options.map((option, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.modalOption, { marginBottom: 10 }]}
                onPress={() => handleOptionPress(option)}
              >
                <View style={styles.modalOptionText}>
                  <Text style={styles.modalOptionTitle}>{option.text}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// Export types for use in parent component
export type { SimulationState, SimulationOption, SimulationStep };
