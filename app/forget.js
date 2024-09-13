import { View, Text, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native'
import React from 'react'
import { Btn, Forms } from '../components';
import { Link, router, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import img from '../assets/images/splash.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch, useSelector } from'react-redux';
import { AUTH_KEY } from '../constants';
// import { resetError, r } from '../redux/auth/authSlice';



export default function forget() {
  const [email, setEmail] = React.useState("")
const navigation = useNavigation()
const params = useLocalSearchParams();
const {route} = params;
const {user, user_loading, user_success, user_error, user_message} = useSelector(state => state.user)
const dispatch = useDispatch();
console.log(user_message)
React.useEffect(()=>{

  if(user_success){
    router.push(route? route : "/(tabs)/profile")
  }else if(user_error){
    Alert.alert("Error", `${user_message}`)
    setTimeout(()=>{
      dispatch(resetError())
    }, 4000); 
  }

},[user_success, user_error, user_message])


  const onForget = async () =>{
    // if(email){
    //   // navigation.navigate('Home')
    //   // navigation.dispatch(DrawerActions.openDrawer())
    //   // router.push(route? route : "/(tabs)/profile")
    //   console.log({email, AUTH_KEY})
    //   dispatch(getToken({email, password, AUTH_KEY}))

    // }else{  
    //   Alert.alert("Please fill all fields")
    // }
  }


  return (
  <KeyboardAvoidingView
  className="flex-1" 
  behavior={Platform.OS === "ios" ? 'padding' : ""}
  >
    <Stack.Screen options={{
      // title:'Forget Password',
      // presentation: 'modal',
    //   headerBackTitle: ''
    // headerBackTitleVisible: false,
    // headerTintColor: '#1e293b'
    presentation: 'modal',
    title:'Forget',
      headerBackTitle: '',
    // headerBackTitleVisible: false,
    headerTintColor: '#1e293b',
    tabBarStyle: {
        display: "none",
      },
    tabBarButton: () => null,
    headerShown:true,
    headerLeft: (props) => ( <View className="px-4">
          <MaterialCommunityIcons
        containerStyle={{}}
        onPress={()=>router.push("/login")}
        size={24}
        color="black"
        name="arrow-left"
      />
        </View>),
      }} />
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4 py-6">
        <View>
          <Image source={img} style={{ width: 200, height: 200 }} />
        </View>
      <Text className="text-slate-800 font-bold capitalize text-[24px] self-start pb-2">Change Password</Text>
      <Text className="self-start pb-2 font-light text-gray-500 pl-4">Check your Email</Text>
      <Forms placeholder='Enter your email'
      item={email}
      setItem={setEmail} 
      />
      <View className="w-full py-3 items-center justify-center">
        <Btn onPress={onForget} title="Forget" />
      </View>
      

      <View className="py-4 px-4 self-center">
        <Text>
            Dont have an account?
            <Link href='/login'>
          <Text className="font-bold text-[16px]">   Sign In</Text>
          </Link>
          </Text>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}