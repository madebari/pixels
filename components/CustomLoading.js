import { View, Text, Image } from 'react-native'
import React from 'react'
import img from "../assets/images/PAKUA 2b-01.png"
export default function CustomLoading() {
  return (
    <View className="flex-1 items-center justify-center">
        <Image source={img} className="h-72 w-full cover-fill" />
      <Text className="text-black font-regular uppercase text-[24px]">Loading...</Text>
    </View>
  )
}