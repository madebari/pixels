import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function edit() {
  return (
    <View>
      <Stack.Screen options={{
      title:'Edit Profile',
      headerTintColor: '#1e293b',
    //   headerBackTitle: ''
    headerBackTitleVisible: false
      }} />
      <Text>edit</Text>
    </View>
  )
}