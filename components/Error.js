import { View, Text } from 'react-native'
import React from 'react'

export default function Error({message="Error Occured"}) {
  return (
    <View className="bg-red-800 px-4 py-3 mx-auto rounded-lg mt-2">
      <Text className="text-white font-bold text-[18px]">{message}</Text>
    </View>
  )
}