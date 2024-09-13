import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function notifications() {
  return (
    <View>
        <Stack.Screen options={{
            headerBackTitleVisible: false,
            headerTintColor: '#1e293b',
      title:'Notifications',}} />
      <Text>notifications</Text>
    </View>
  )
}