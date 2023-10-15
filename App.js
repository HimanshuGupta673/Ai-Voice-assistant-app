import { View, Text,SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import AppNavigation from './src/navigation/navigation'
import { apiCall } from './src/api/OpenAi'
export default function App() {
  // useEffect(()=>{
  //   apiCall('what is quantum computing')
  // },[])
  return (
      <AppNavigation/>
  )
}