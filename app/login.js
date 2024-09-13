import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import {
  Link,
  router,
  Stack,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import {
  autologin,
  getToken,
  resetError,
  resetToken,
  validateToken,
} from "../redux/auth/authSlice";
import { Btn, Forms } from "../components";
import img from "../assets/images/splash.png";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_KEY, save } from "../constants";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const params = useLocalSearchParams();
  const { route } = params;
  const navigation = useNavigation();
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
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
    if (user_error) {
      let message = user?.message ? user.message : user_message?.message;
      // console.log(message)
      Alert.alert("Error", 'Wrong credentials');
      setTimeout(() => {
        dispatch(resetError());
      }, 4000);
    } else if (user_success &&user_message) {
      let message = user?.message ? user.message : user_message?.message;
      Alert.alert("Error", 'Wrong credentials');
      setTimeout(() => {
        dispatch(resetError());
      }, 3000);
    } else if (user_success) {
      save("user", user);
      setTimeout(() => {
        router.push(route ? route : "/(tabs)/profile");
      }, 3000);
    
    }
  }, [user_success, user_error, user_message, user]);

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
      dispatch(validateToken({jwt: token?.data?.jwt, AUTH_KEY}))
    }
  }, [token_success, token_error, token_message, token]);

  const onLogin = async () => {
    if (email && password) {
      // console.log({email, password, AUTH_CODE: AUTH_KEY})
      dispatch(getToken({ email, username: email, password, AUTH_KEY }));
    } else {
      Alert.alert("Please fill all fields");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : ""}
    >
      <Stack.Screen
        options={{
          presentation: "modal",
          title: "Sign In",
          headerBackTitle: "",
          // headerBackTitleVisible: false,
          headerTintColor: "#1e293b",
          tabBarStyle: {
            display: "none",
          },
          tabBarButton: () => null,
          headerShown: true,
          headerLeft: (props) => (
            <View className="px-4">
              <MaterialCommunityIcons
                containerStyle={{}}
                onPress={() => router.push(route ? route : "/(tabs)/profile")}
                size={24}
                color="black"
                name="arrow-left"
              />
            </View>
          ),
        }}
      />
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center bg-white px-4">
          <View>
            <Image source={img} style={{ width: 200, height: 200 }} />
          </View>
          <Text className="text-black font-bold capitalize text-[28px] self-start pb-4">
            Welcome
          </Text>
          <Forms
            placeholder="Enter your email"
            item={email}
            setItem={setEmail}
          />
          <Forms
            passwd={true}
            placeholder="Enter your password"
            item={password}
            setItem={setPassword}
          />
          <View className="w-full py-3 items-center justify-center">
            <Btn onPress={onLogin} loading={token_loading} title="Sign In" />
          </View>
          <View className="py-4 items-center">
            <Link href="/forget">
              <Text className="font-regular text-[16px]">Forget Password?</Text>
            </Link>
          </View>

          <View className="px-4 py-4 items-center">
            <Text>
              Dont have an account?
              <Link href="/register">
                <Text className="font-bold text-[16px]"> Sign Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
