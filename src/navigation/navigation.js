import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
return (
  <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='WelcomeScreen'>
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
    <Stack.Screen name="HomeScreen" component={HomeScreen}/>
  </Stack.Navigator>
</NavigationContainer>
)
}


