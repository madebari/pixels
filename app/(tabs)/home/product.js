import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { ProductDetails } from '../../../components';

export default function product() {
  
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const params = useLocalSearchParams();
  const { id } = params;


    const {medias} = useSelector(state=>state.medias)
    const {product} = useSelector(state=>state.product)


  React.useEffect(()=>{
    if(id){
     const new_data = product?.filter(item=>{
      if(item?.id == id){
        setData(item)
      }
     })
     if(new_data){
     setLoading(false)
     }
    }
  },[id])
     
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    className="bg-white">
      <Stack.Screen options={{
      title:'',
    headerBackTitleVisible: false,
    headerTintColor: '#1e293b'
      }} />
      <ProductDetails
      data={data} 
      medias={medias}
      />
    </ScrollView>
  )
}