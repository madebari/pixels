import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { returnItem, returnFormat } from '../constants'

import TicketComponent from './TicketComponent';
import { router } from 'expo-router';

export default function TicketDetails({item, medias}) {
    const [number_person, setNumberPerson] = React.useState(0)
    const [number_regular, setNumberRegular] = React.useState(0)
    const [number_vip, setNumberVIP] = React.useState(0)

    const media = returnItem(medias, item?.featured_media)
  return (
    <View className="px-4 py-3 flex-1">
        <View className="h-[300px] rounded-xl w-[99%] self-center px-3 py-3  bg-slate-100">
            <Image 
            className="h-[100%] w-full cover-fill rounded-xl"
             source={{uri:media[0]?.media_details?.sizes?.full?.source_url}}  
             />
             </View>

            <View className="px-4 py-4">
                 <Text className="text-[24px] font-normal capitalize">
                Tickets
             </Text>
            </View>

{/* PERSON */}
   <TicketComponent 
    title="Per Person"
    cost={returnFormat(item?.acf?.perperson)} 
    details={item?.acf?.Personal_Details}
    item={number_person}
    setItem={setNumberPerson}
    />

{/* end person */}


{/* Regualr */}
<TicketComponent 
    title="Regular Table"
    cost={returnFormat(item?.acf?.regular_table)} 
    details={item?.acf?.Regular_Details}
    item={number_regular}
    setItem={setNumberRegular}
    />
{/* end regular */}


{/* vip */}

<TicketComponent 
    title="VIP Table"
    cost={returnFormat(item?.acf?.vip_table)} 
    details={item?.acf?.VIP_details}
    item={number_vip}
    setItem={setNumberVIP}
    />
{/* end vip */}


{/* ORDER SUMMARY */}
<View className="bg-slate-100 my-4 rounded-lg py-4 px-3">
   <View className="space-y-2">
    <Text className="text-[18px] my-2 font-bold">Order summary</Text>
    <View className="flex-row items-start justify-between my-3 rounded-lg bg-white py-3 px-3">
        <Text className="text-[16px] font-regular">Price</Text>
        <View>
            {number_person > 0 ? (<Text className="text-[16px] font-regular">Person TZS {returnFormat(item?.acf?.perperson)}</Text>): <></>}
            {number_regular > 0 ? (<Text className="text-[16px] font-regular pt-2">Regular TZS {returnFormat(item?.acf?.regular_table)}</Text>): <></>}
            {number_vip > 0 ? (<Text className="text-[16px] font-regular pt-2">VIP TZS {returnFormat(item?.acf?.vip_table)}</Text>): <></>}
        </View>
    </View>
     <View className="flex-row items-start justify-between my-3 rounded-lg bg-white py-3 px-3">
        <Text className="text-[16px] font-regular">Fee</Text>
        <View>
            {number_person > 0 ? (<Text className="text-[16px] font-regular">Person {number_person}</Text>): <></>}
            {number_regular > 0 ? (<Text className="text-[16px] font-regular pt-2">Regular {number_regular}</Text>): <></>}
            {number_vip > 0 ? (<Text className="text-[16px] font-regular pt-2">VIP {number_vip}</Text>): <></>}
        </View>
    </View>
    <View className="flex-row items-center justify-between">
        <Text className="text-[16px] font-normal">Total</Text>
        <Text className="text-[16px] font-regular">{returnFormat((number_person * Number(item?.acf?.perperson))+(number_regular*(Number(item?.acf?.regular_table)))+(number_vip*(Number(item?.acf?.vip_table))))}</Text>
    </View>
   </View>
  </View>
{/* END ORDER SUMMARY */}


{/* PAY */}
<View className="py-4 px-4 items-center justify-center">
                <TouchableOpacity 
                onPress={() => {
                          router.push({
                            pathname: "/pay",
                            params: { 
                                event: item?.id, 
                                shop: null, 
                                number_person:number_person,
                                number_regular:number_regular,
                                number_vip:number_vip,
                                route: "/(tabs)/home/ticket" 
                            },
                          });
                        }}
        //            onPress={() => {
        //   router.push({ pathname: "/home/ticket", params: { id: data?.id } });
        // }}
                    className="bg-black w-full py-5 px-3 rounded-xl items-center justify-center">
                     <Text className="text-gray-300 text-[19px] capitalize font-regular">Buy</Text>
                    </TouchableOpacity>
             </View>
{/* END PAY */}

    </View>
  )
}