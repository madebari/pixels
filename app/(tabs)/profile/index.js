import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { Stack, useNavigation, router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DrawerActions } from '@react-navigation/native'
import { save, getValueFor} from '../../../constants'
import { useSelector, useDispatch } from'react-redux'
import { saveUser } from '../../../redux/auth/authSlice'
import { BookingCard } from '../../../components'

export default function profile() {
  const navigation = useNavigation()

  const [result, setResult] = React.useState(null)
  const [results, setResults] = React.useState(null)
// const [loading, setLoading] = React.useState(true)
  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(true)

  const { user } = useSelector(state=>state.user)

  React.useEffect(()=>{
  checkUserExisted()
  },[])

  React.useEffect(()=>{
    if(!user && result){
      dispatch(saveUser(result))
    }
  },[result, user])

  function checkUserExisted(){
    getValueFor('user', setResult);
    setLoading(false)
  }
  const logout = () => {
    const dt = null
    save('user', dt)
    navigation.navigate('/')
  }


  const {orders} = useSelector(state => state.orders)

  React.useEffect(()=>{
    if(orders){
      const filteredOrders = orders?.filter(order=>Number(order?.acf?.user) === Number(user?.data?.user?.ID))
      // console.log(filteredOrders)
      if(filteredOrders){
        setResults(filteredOrders)
        setLoading(false)
      }
    }
  },[orders])

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    className=" bg-white">
      <Stack.Screen options={{
      title:'Profile',
      headerTintColor: '#1e293b',
      headerLeft: (props) => ( <MaterialCommunityIcons
        containerStyle={{}}
        onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}
        size={24}
        color="black"
        name="menu"
      />),
    
    }} />
      <View className="flex-1">
       {loading ? <View className="flex-1 items-center justify-center">
        <Text className="text-slate-800 font-regular text-[20px]">Loading...</Text>
       </View> : <View className="">
        {user ? (
        <View className="flex-1 bg-white py-4 px-4">

          <View classNmae="flex items-center justify-center">
            <View style={{ width: 100, height:100}} >
              <Image 
              className="w-full h-full"
            source={{ uri: "https://pakuaapp.com/wp-content/uploads/2024/08/istockphoto.jpg" }} 
             />
              </View>
            </View>
          
          <View className="flex-row items-center space-x-14 py-2">
            <Text className="font-bold text-[19px] text-slate-800 capitalize ">Name</Text>
            <Text className="text-[19px] font-regular text-slate-800 capitalize ">{user?.data?.user?.display_name}</Text>
            </View>
{/* 
             <View className="flex-row items-center space-x-14 py-2">
            <Text className="text-[19px] text-slate-800 font-bold">Phonenumber</Text>
            <Text className="text-[19px] text-slate-800 font-regular">{user?.data?.user?.first_name}</Text>
            </View> */}

             <View className="flex-row items-center space-x-14 py-2">
            <Text className="font-bold text-[19px] text-slate-800">Email</Text>
            <Text className="text-[19px] font-regular text-slate-800">{user?.data?.user?.user_email}</Text>
            </View>

            <View className="flex-1 mt-5 py-3">
              <Text className="font-regular text-[20px] capitalize">Your Activities</Text>
            </View>

            <View>
              {results?.length > 0 ? (
          <View>
            {results.map((order, index)=>{
              return <BookingCard key={index} pay={true} order={order} />
            })}
          </View>
       ) :<View className="py-3">
        <Text className="text-[15px] text-slate-800 font-light capitalize">No Activities</Text></View>}
              </View>
        </View>
      ) : (
        <View className="flex-1 items-center py-6 bg-white">
          <Text className="text-[22px] mb-3 text-slate-800 self-center capitalize font-regular">You do not have an account</Text>
          <Text className="text[18px] text-slate-800 self-center capitalize font-regular">Register or Login here</Text>
       <TouchableOpacity 
       onPress={()=>router.push({
         pathname: "/login",
         params: { route: "/(tabs)/profile" },
       })}
       className="mt-4 bg-slate-800 px-6 rounded-2xl py-3 items-center justify-center">
        <Text className="text-white font-bold capitalize">Login</Text>
       </TouchableOpacity>
        </View>
      )}</View>} 
      </View>
    </ScrollView>
  )
}