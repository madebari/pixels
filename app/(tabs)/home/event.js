import { View, Text, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { EventCard } from '../../../components';

import { formatDate, getADay, getAWeak, 
  returnFormat, returnItem } from '../../../constants';

export default function event() {
     const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  

  const params = useLocalSearchParams();
  const { cat, tpe, shop } = params;
  // console.log(shop)

  const aweek = getAWeak()
  const values = Object.values(aweek)
  // console.log(aweek)

  const aday = getADay()

  const dayvalue = Object.values(aday)
  // console.log(dayvalue)

  const {event_loading, 
    event_success,events, event_error, 
    event_message} = useSelector(state=>state.events)
    
    const {organizer} = useSelector(state=>state.organizer)

    const {venue} = useSelector(state=>state.venue)

    const {medias} = useSelector(state=>state.medias)

    const {eventtype} = useSelector(state=>state.eventtype)
    const {product_category} = useSelector(state=>state.product_category)
    // console.log(eventtype)

    const {eventcategory} = useSelector(state=>state.eventcategory)

    const {product} = useSelector(state=>state.product)

    // console.log(product_category)

    const [selected, setSelected] = React.useState(product_category[0]?.id)


  React.useEffect(()=>{
    if(cat){
     const new_data = events?.filter(item=>{
      if(item?.event_category[0] == cat){
        return item
      }
     })
     if(new_data.length > 0 ){
        setData(new_data)
        setLoading(false)
     }
    }else if (tpe.toLocaleLowerCase() == "upcoming".toLocaleLowerCase()){
        const new_data = events?.filter(item=>{
        const str = formatDate(item?.acf?.start_date)
        const myArray = str.split(" ");
        let new_dt = myArray[0] +' '+ myArray[1] +' '+ myArray[2] + ' '+ myArray[3]
         if(dayvalue[0].includes(new_dt)){
              return item
         }
        
      })

      if(new_data.length > 0){
        setData(new_data)
        setLoading(false)
      }

    }else if(tpe.toLocaleLowerCase() == "this_week".toLocaleLowerCase()){


      const new_data = events?.filter(item=>{
        const str = formatDate(item?.acf?.start_date)
        const myArray = str.split(" ");
        let new_dt = myArray[0] +' '+ myArray[1] +' '+ myArray[2] + ' '+ myArray[3]
        for(let index=0; index<values.length; index++){
        if(values[index]?.includes(new_dt)){
          if(dayvalue[0].includes(new_dt)){
              return;
          }else{
           return item
         }
              
             }
        }
      })

      if(new_data.length > 0){
        setData(new_data)
        setLoading(false)
      }
    }
    if(shop){
      const new_data = product?.filter(item=>item?.product_category[0] === selected)
      if(new_data.length > 0){
       setData(new_data)
       setLoading(false)
      }
       
    }
  },[cat, shop, tpe, selected])
// const title = shop ? 'Shop' : 'Event'



function renderItemComp({item}) {
    // console.log(item)
    const media = returnItem(medias, item?.featured_media);
    return (
      <View className="flex-1 m-2">
        <TouchableOpacity
          key={item?.id}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/home/product",
              params: { id: item?.id },
            })
          }
          className="flex-1 bg-slate-100 rounded-lg shadow-sm"
        >
          <Image
            className="w-full h-[130px] shadow-lg rounded-t-lg cover-fill"
            source={{
              uri: media[0]?.media_details?.sizes?.full?.source_url,
            }}
          />
          <View className="py-4 px-4">
            <Text className="text-[24px] font-regular mb-3 capitalize">
              {item?.title?.rendered}
            </Text>
            <Text className="text-[15px] font-light uppercase">
              TZS {returnFormat(item?.acf?.cost)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{
      title:shop ? 'Shop' : 'Event',
    //   headerBackTitle: ''
    headerBackTitleVisible: false,
    headerTintColor: '#1e293b'
      }} />
      {shop ? (<>
      <View className="flex-1 px-4">
        <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        >
       <ScrollView
       horizontal={true}
        showsHorizontalScrollIndicator={false}
       >
       </ScrollView>
        <View className="flex-1 py-4">
        {data?.length > 0 ? (
          <View>
            <FlatList
      data={data}
        numColumns={2}
        ListHeaderComponent={() => {
          return (
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View className="flex-1 py-3">
                  {product_category?.length > 0 ? (
                    <>
                      <View className="flex-row space-x-4">
                        {product_category?.map((item) => (
                          <TouchableOpacity
                            onPress={() => setSelected(item?.id)}
                            key={item?.id}
                            className={
                              selected === item?.id
                                ? "items-center justify-center px-5 py-2 bg-slate-800 rounded-2xl"
                                : "items-center justify-center px-5 py-2 border-2 border-slate-800 rounded-2xl"
                            }
                          >
                            <Text
                              className={
                                selected === item?.id
                                  ? "text-white uppercase font-light text-[10px]"
                                  : "text-slate-800 uppercase font-light text-[10px]"
                              }
                            >
                              {item?.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  ) : (
                    <>
                      <View className="py-4">
                        <Text className="font-bold text-[20px]">
                          No Catgories
                        </Text>
                      </View>
                    </>
                  )}
                </View>
              </ScrollView>
            </View>
          );
        }}
        keyExtractor={item => item?.id}
        renderItem={renderItemComp}
      />
          </View>
        ) : <View>
        <Text>No prodcut</Text></View>}
        </View>
        </ScrollView>    
        
      </View>
      </> ) : <ScrollView 
      showsVerticalScrollIndicator={false} 
      className="bg-white">
      
      <View className="flex-1 py-4">
      {data.length > 0 ? (
      <View className="flex-1 px-4">
        {data?.map(item=>{
         
          return (

            <EventCard 
            key={item?.id} 
             item={item} 
             to={"/(tabs)/home/details"} />
          )
        })}
      </View>) : <View className="flex-1 items-center justify-center">
        <Text className="font-regular text-[20px]">No Events yet</Text>
        </View>}
      </View>
    </ScrollView>}
    </View>
  )
}