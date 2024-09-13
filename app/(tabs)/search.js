import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Forms, EventCard } from '../../components'
import { useSelector } from 'react-redux'

import { Tabs, useNavigation } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'

export default function search() {
  const [search, setSearch] = React.useState('')
  const [result, setResult] = React.useState([])

  const navigation = useNavigation()

  const {events} = useSelector(state=>state.events)
  const {medias} = useSelector(state=>state.medias)


  React.useEffect(()=>{
    if(search){
     let new_array = events?.filter(item=>{
      if(item?.title?.rendered.toLowerCase().includes(search.toLowerCase())){
        return item
      }
     })
     if(new_array){
      setResult(new_array)
     }
    }else{
      setResult([])
    }
  },[search])

  
  return (
    <View className="flex-1 pt-6 bg-white">
      <Tabs.Screen  options={{
        headerShown: true,
        title:'Search',
        // headerStyle: {backgroundColor:'orange'},
        // headerTintColor: '#1e293b',
     
        
        headerLeft: (props) => ( <View className="px-4">
          <MaterialCommunityIcons
        containerStyle={{}}
        onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        size={24}
        color="black"
        name="menu"
      />
        </View>),
      }} />
      <View className="px-4">
        <Forms item={search} setItem={setSearch} placeholder='search' />
      </View>
      <ScrollView 
      showsVerticalScrollIndicator={false} 
      className="bg-white">
      
      <View className="flex-1 py-5">
      {result.length > 0 ? (
      <View className="flex-1 px-4">
        {result?.map(item=>{
         
          return (

            <EventCard 
            key={item?.id} 
             item={item} 
             to={"/(tabs)/home/details"} />
          )
        })}
      </View>) : <View className="flex-1 items-center justify-center">
        <Text className="font-light text-[24px]">No serch result yet</Text>
        </View>}
      </View>
    </ScrollView>
    </View>
    
  )
}