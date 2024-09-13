import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { router } from 'expo-router';
import {CustomDrawerContent} from "../components"

import {
  useFonts,
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from '@expo-google-fonts/lato';

SplashScreen.preventAutoHideAsync();


export default function LayoutScreen() {
const [appIsReady, setAppIsReady] = useState(false);

let [fontsLoaded] = useFonts({
    'thin': Lato_100Thin,
    'light':Lato_300Light,
    'regular':Lato_400Regular,
    'bold':Lato_700Bold,
    'black':Lato_900Black,
  });


  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      if(fontsLoaded){
        await SplashScreen.hideAsync();
      setTimeout(()=>{
        router.navigate("home")
      },5000)
      }
    }
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
    <View onLayout={onLayoutRootView} />
    <Drawer
      drawerContent={(props) => {
            
        return <CustomDrawerContent backBehavior='history' drawerPosition={undefined} {...props} />
      }}
      screenOptions={{ headerShown: false }}
      
    >
    </Drawer>
   </GestureHandlerRootView>
   </Provider>
  )
}