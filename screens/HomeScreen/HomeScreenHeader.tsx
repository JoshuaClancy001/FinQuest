import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeScreenStyles as styles } from '../../styles/HomeScreenStyles';
import { User } from '../../types/user';

interface HomeScreenHeaderProps {
  user: User | null;
  onAvatarPress: () => void;
}

export default function HomeScreenHeader({ user, onAvatarPress }: HomeScreenHeaderProps): React.JSX.Element {
  // Get screen dimensions for responsive sizing
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth >= 768;

  return (
    <View style={[styles.header, { paddingHorizontal: isTablet ? 40 : 20 }]}>
      {/* Left side - Avatar and greeting */}
      <View style={styles.leftSection}>
        <TouchableOpacity style={[
          styles.avatarContainer,
          { 
            width: isTablet ? 60 : 50,
            height: isTablet ? 60 : 50,
            borderRadius: isTablet ? 30 : 25
          }
        ]} onPress={onAvatarPress}>
          <Text style={[
            styles.avatarText,
            { fontSize: isTablet ? 22 : 18 }
          ]}>{user?.initials}</Text>
        </TouchableOpacity>
        <View style={styles.greetingContainer}>
          <Text style={[
            styles.greetingText,
            { fontSize: isTablet ? 16 : 14 }
          ]}>Welcome back,</Text>
          <Text style={[
            styles.nameText,
            { fontSize: isTablet ? 18 : 16 }
          ]}>{user?.username}</Text>
        </View>
      </View>

      {/* Right side - Stats and notification */}
      <View style={styles.rightSection}>
        {/* Coins */}
        <View style={styles.statItem}>
          <Ionicons name="logo-bitcoin" size={16} color="#FFD700" />
          <Text style={styles.statValue}>{user?.cash.toLocaleString()}</Text>
        </View>
        
        {/* Streak */}
        <View style={styles.statItem}>
          <Ionicons name="flame" size={16} color="#FF6B35" />
          <Text style={styles.statValue}>{user?.streak}</Text>
        </View>
        
        {/* Notification Bell */}
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
