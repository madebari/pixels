import { WebView } from "react-native-webview";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import React from "react";
import RenderHTML from "react-native-render-html";
import { formatDate, returnFormat, returnItem } from "../constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { addCart, allCart, reset } from "../redux/cart/cartSlice";

export default function ProductDetails({ medias, data }) {
  const [item, setItem] = React.useState(1);
  const media = returnItem(medias, data?.featured_media);
  const { user } = useSelector((state) => state.user);
  const { cart, cart_loading, cart_add_sucess, cart_error, cart_message } =
    useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const source = {
    html: data?.content?.rendered,
  };

  const addToCart = () => {
    if (user) {
      if (item > 0) {
        // Add to cart
        const data_used = {
          title: data?.title?.rendered,
          slug: data?.title?.rendered,
          status: "publish",
          type: "register",
          acf: {
            product: data?.id,
            user: user?.data?.user?.ID,
            isPayed: false,
            total_item: item,
          },
        };
        dispatch(addCart(data_used));

        // NAVIGATE TO CART PAGE AFTER ADDED
      } else {
        Alert.alert("Error", "Atleast one item is required");
      }
    } else {
      router.push({
        pathname: "/login",
        params: { route: "/(tabs)/home/product" },
      });
    }
  };
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    if (cart_error) {
      Alert.alert("Error", `Failed to add to cart: ${cart_message}`);
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
    }
  }, [cart_message, cart_error]);

  React.useEffect(() => {
    if (cart_add_sucess) {
      // dispatch(allCart())
      dispatch(reset());
      setTimeout(() => {
        router.push({
          pathname: "/(tabs)/home/cart",
        });
      }, 3000);
    }
  }, [cart_add_sucess]);

  return (
    <View className="px-4 py-3 flex-1">
      <View className="h-[400px] rounded-xl w-full self-center">
        <Image
          className="h-full w-full cover-fill rounded-xl"
          source={{ uri: media[0]?.media_details?.sizes?.full?.source_url }}
        />
      </View>

      <View className="py-6">
        <Text className="text-[24px] font-regular">
          {data?.title?.rendered}
        </Text>
      </View>

      <View className="py-6 flex-row items-center justify-between px-2">
        <Text>TZS {returnFormat(data?.acf?.cost)}</Text>

        <View className="flex-row space-x-2 items-center justify-center bg-slate-200 shadow-lg rounded-full ">
          <TouchableOpacity
            onPress={() => setItem((txt) => (Number(txt) > 0 ? txt - 1 : txt))}
            className="rounded-full items-center justify-center w-8 h-8"
          >
            <AntDesign name="minus" size={18} color="black" />
          </TouchableOpacity>

          <Text className="text-[16px] font-light">{item}</Text>

          <TouchableOpacity
            onPress={() => setItem((txt) => txt + 1)}
            className="rounded-full items-center justify-center w-8 h-8"
          >
            <Ionicons name="add" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="py-6">
        <Text className="text-[24px] font-bold capitalize">Description</Text>
        <View className="flex-1">
          <RenderHTML contentWidth={width} source={source} />
        </View>
      </View>

      <View className="items-center justify-center">
        <TouchableOpacity
          onPress={addToCart}
          className="bg-slate-800 shadow-md w-full py-4 px-3 rounded-xl items-center justify-center"
        >
          {cart_loading ? (
            <Text className="text-gray-300 text-[19px] uppercase font-regular">
              Loading...
            </Text>
          ) : (
            <Text className="text-gray-300 text-[19px] uppercase font-regular">
              Add Cart
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
