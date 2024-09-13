import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { Link, router, Stack, useLocalSearchParams, useNavigation } from 'expo-router'
import { Btn, Forms } from '../components';
import img from '../assets/images/splash.png'
import { DrawerActions } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from'react-redux';
import { AUTH_KEY, save } from '../constants';
import { register, resetError, validateToken } from '../redux/auth/authSlice';


export default function registerscreen() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [phonenumber, setPhoneNumber] = React.useState("")
  const navigation = useNavigation()

const params = useLocalSearchParams();
const {route} = params;

const {
    user, 
    token,
    token_loading,
    token_success,
    token_error,
    token_message,
    user_loading,
    user_success,
    user_error,
    user_message,
  } = useSelector(state => state.user)
const dispatch = useDispatch();

React.useEffect(()=>{

  if(user_success){
    save('user',user);
    setTimeout(()=>{
      router.push(route? route : "/(tabs)/profile")
    },4000)
  }else if(user_error){
    const msg = user_message?.message;
    Alert.alert("Error", `Invalid credentials`)
    setTimeout(()=>{
      dispatch(resetError())
    }, 3000); 
  }

},[user_success, user_error, user_message, user])


  React.useEffect(() => {
    if (user) {
      save("user", user);
      setTimeout(() => {
        router.push(route ? route : "/(tabs)/profile");
      }, 3000);
    }
  }, [user]);


  React.useEffect(() => {
    // console.log(user_success)
    if (token_error) {
      let message = token?.message ? token.message : token_message?.message;
      // console.log(message)
      Alert.alert("Error", 'Wrong credentials');
      setTimeout(() => {
        dispatch(resetToken());
      }, 4000);
    } else if (token_success && token_message) {
      let message = token?.message ? token.message : token_message?.message;
      Alert.alert("Error", 'Wrong credentials');
      setTimeout(() => {
        dispatch(resetToken());
      }, 3000);
    } else if (token_success) {
      // dispatch(autologin({jwt: token?.data?.jwt, AUTH_KEY}))
      dispatch(validateToken({jwt: token?.jwt, AUTH_KEY}))
    }
  }, [token_success, token_error, token_message, token]);


  const onRegister = async () =>{
    if(email && password && name && phonenumber){
      // console.log({email,name,phonenumber, password, AUTH_KEY})
      dispatch(register({email,display_name:name,first_name:phonenumber, password, AUTH_KEY}))

    }else{  
      Alert.alert("Please fill all fields")
    }
  }


  return (
  <KeyboardAvoidingView 
  className="flex-1" 
  behavior={Platform.OS === "ios" ? 'padding' : ""}
  >
    <Stack.Screen options={{
      // title:'Sign Up',
      // presentation: 'modal',
    //   headerBackTitle: ''
    // headerBackTitleVisible: false,
    // headerTintColor: '#1e293b'
    presentation: 'modal',
    title:'Sign Up',
      headerBackTitle: '',
    // headerBackTitleVisible: false,
    headerTintColor: '#1e293b',
    tabBarStyle: {
        display: "none",
      },
    tabBarButton: () => null,
    headerShown:true,
    headerLeft: (props) => (  <View className="px-4">
          <MaterialCommunityIcons
        containerStyle={{}}
        onPress={()=>router.push("/login")}
        size={24}
        color="black"
        name="arrow-left"
      />
        </View>),
      }} />
    <ScrollView className="flex-1 bg-white px-4">
      <View className="flex-1 items-center justify-center bg-white px-4">
        <View>
          <Image source={img} style={{ width: 200, height: 200 }} />
        </View>
      <Text className="text-slate-800 font-bold py-4 capitalize text-[24px] self-start pb-2">Create an Account</Text>
      <Text className="self-start pb-2 font-light text-gray-500 pl-4">Fill your profile</Text>
      <Forms placeholder='Enter your name'
      item={name}
      setItem={setName} 
      />
      <Forms placeholder='Enter your email'
      item={email}
      setItem={setEmail} 
      />
      <Forms placeholder='Enter your phonenumber'
      item={phonenumber}
      setItem={setPhoneNumber} 
      />
      <Forms passwd={true} placeholder='Enter your password'
      item={password}
      setItem={setPassword} 
      />
      <View className="w-full py-3 items-center justify-center">
        <Btn onPress={onRegister} loading={user_loading} title="Sign Up" />
      </View>
      <View className="py-4 items-center">
        <Link href='/forget'>
          <Text className="font-regular text-[16px]">Forget Password?</Text>
          </Link>
      </View>

      <View className="items-center">
        <Text>
            have an account?
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