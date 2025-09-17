import React from 'react';
import HomeScreenProfileModal from './HomeScreenProfileModal';
import HomeScreenSimulationModal, { SimulationState, SimulationStep } from './HomeScreenSimulationModal';

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
  onSimulationNextStep
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
    </>
  );
}

// Export types for convenience
export type { SimulationState, SimulationStep } from './HomeScreenSimulationModal';
