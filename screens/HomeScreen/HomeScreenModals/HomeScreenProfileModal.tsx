import React from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeScreenStyles as styles } from '../../../styles/HomeScreenStyles';

interface HomeScreenProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function HomeScreenProfileModal({ visible, onClose }: HomeScreenProfileModalProps): React.JSX.Element {
  
  const handleCameraPress = () => {
    onClose();
    // TODO: Implement camera functionality
    Alert.alert('Camera', 'Camera functionality will be implemented here');
  };

  const handleGalleryPress = () => {
    onClose();
    // TODO: Implement gallery selection
    Alert.alert('Gallery', 'Gallery selection will be implemented here');
  };

  const handleRemovePhoto = () => {
    onClose();
    // TODO: Implement remove photo functionality
    Alert.alert('Remove Photo', 'Photo removal will be implemented here');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.profileModal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Profile Picture</Text>
            <TouchableOpacity 
              onPress={onClose}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={handleCameraPress}
            >
              <View style={styles.modalOptionIcon}>
                <Ionicons name="camera" size={24} color="#007AFF" />
              </View>
              <View style={styles.modalOptionText}>
                <Text style={styles.modalOptionTitle}>Take Photo</Text>
                <Text style={styles.modalOptionSubtitle}>Use your camera to take a new photo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption}
              onPress={handleGalleryPress}
            >
              <View style={styles.modalOptionIcon}>
                <Ionicons name="images" size={24} color="#34C759" />
              </View>
              <View style={styles.modalOptionText}>
                <Text style={styles.modalOptionTitle}>Choose from Gallery</Text>
                <Text style={styles.modalOptionSubtitle}>Select an existing photo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalOption}
              onPress={handleRemovePhoto}
            >
              <View style={styles.modalOptionIcon}>
                <Ionicons name="trash-outline" size={24} color="#FF3B30" />
              </View>
              <View style={styles.modalOptionText}>
                <Text style={styles.modalOptionTitle}>Remove Photo</Text>
                <Text style={styles.modalOptionSubtitle}>Go back to using initials</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
