import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { returnFormat, returnItem } from "../../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";


export default function shop() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { product } = useSelector((state) => state.product);
  const { product_category } = useSelector((state) => state.product_category);
  const [selected, setSelected] = React.useState(product_category[0]?.id);
  const { medias } = useSelector((state) => state.medias);
  const navigation = useNavigation();
  React.useEffect(() => {
    if (product) {
      const new_data = product?.filter(
        (item) => item?.product_category[0] === selected
      );
      if (new_data.length > 0) {
        setData(new_data);
        setLoading(false);
      }
    }
  }, [product, selected]);

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
    <View className="flex-1 px-4 bg-white">
      <Stack.Screen
        options={{
          title: "Shop",
          //   headerBackTitle: ''
          headerBackTitleVisible: false,
          headerTintColor: "#1e293b",
          headerLeft: (props) => (
            <MaterialCommunityIcons
              containerStyle={{}}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              size={24}
              color="black"
              name="menu"
            />
          ),
        }}
      />
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
                  {product_category.length > 0 ? (
                    <>
                      <View className="flex-row space-x-4">
                        {product_category.map((item) => (
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
        keyExtractor={item => item.id}
        renderItem={renderItemComp}
      />
    </View>
  );
}
