import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import PortfolioScreen from './screens/PortfolioScreen';
import WalletScreen from './screens/WalletScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

// Define the tab navigator param list
export type RootTabParamList = {
  Home: undefined;
  Learn: undefined;
  Portfolio: undefined;
  Wallet: undefined;
  Leaderboard: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Learn') {
              iconName = focused ? 'school' : 'school-outline';
            } else if (route.name === 'Portfolio') {
              iconName = focused ? 'trending-up' : 'trending-up-outline';
            } else if (route.name === 'Wallet') {
              iconName = focused ? 'wallet' : 'wallet-outline';
            } else if (route.name === 'Leaderboard') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            } else {
              iconName = 'help-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="Learn" 
          component={LearnScreen}
          options={{
            tabBarLabel: 'Learn',
          }}
        />
        <Tab.Screen 
          name="Portfolio" 
          component={PortfolioScreen}
          options={{
            tabBarLabel: 'Portfolio',
          }}
        />
        <Tab.Screen 
          name="Wallet" 
          component={WalletScreen}
          options={{
            tabBarLabel: 'Wallet',
          }}
        />
        <Tab.Screen 
          name="Leaderboard" 
          component={LeaderboardScreen}
          options={{
            tabBarLabel: 'Leaderboard',
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
