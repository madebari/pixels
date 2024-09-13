import { View, Text } from 'react-native'
import React from 'react'

export default function Success({message="Success"}) {
  return (
    <View className="bg-green-800 px-4 py-3 mx-auto rounded-lg mt-2">
      <Text className="text-white text-bold text-[18px]">{message}</Text>
    </View>
  )
}