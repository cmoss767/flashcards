import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import { Platform, StatusBar } from 'react-native';

// Define the parameter list for the stack navigator
export type RootStackParamList = {
  Home: undefined; // No parameters for HomeScreen
  Quiz: { topicId: string; topicName: string; topicFile: string }; // Parameters for QuizScreen
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff', // Blue header
          },
          headerTintColor: '#fff', // White header text
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Flashcard Topics' }} 
        />
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen} 
          // Title for QuizScreen is set dynamically in QuizScreen.tsx using navigation.setOptions
        />
      </Stack.Navigator>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'} backgroundColor="#007bff" />
    </NavigationContainer>
  );
}
