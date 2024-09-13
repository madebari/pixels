import React from 'react'
import { Dimensions, Text, View, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { returnItem } from '../constants';
import { useDispatch } from 'react-redux';
import { allEvents } from '../redux/events/EventSlice'
import { allmedia } from '../redux/media/mediaSlice'
import { allorganizer } from '../redux/organizer/organizerSlice'
import { allvenue } from '../redux/venue/venueSlice'
import { allEventcategory } from '../redux/eventCategory/eventCategory'
import { allEventtype } from '../redux/eventType/eventType'
import { router } from 'expo-router';

export default function Carousels({data, medias}) {
    const dispatch = useDispatch()

    const width = Dimensions.get('window').width;

    const callRedux = ()  => {
    dispatch(allEvents())
    dispatch(allmedia())
    dispatch(allorganizer())
    dispatch(allvenue())
    dispatch(allEventcategory())
    dispatch(allEventtype())
    }

  return (
    <View style={{ flex:1 }} className='mb-4'>
            <Carousel
                loop
                width={width}
                height={width / 1.8}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={1000}
                renderItem={({ item }) => {

                    const media = returnItem(medias, item?.featured_media)

                    // console.log(media[0]?.media_details?.sizes?.full?.)

                    
                if(media){
                        return (
                    <TouchableOpacity
                    onPress={()=>{
                        router.push({ pathname: "/(tabs)/home/details", params: { id: item?.id } });
                    }}
                        style={{
                            flex: 1,
                            // borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image className="w-full h-full" source={{uri:media[0]?.media_details?.sizes?.full?.source_url}}
                        />
                    </TouchableOpacity>
                )
                    }else{
                        return <View onLayout={callRedux} />
                    }
            
            }}
            />
        </View>
  )
}