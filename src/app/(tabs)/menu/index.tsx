import { FlatList, Platform, View } from "react-native";
import products from "@assets/data/products";
import ProductCard from "@components/ProductCard";
import { StatusBar } from "expo-status-bar";

export default function TabOneScreen() {
  return (
    <View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 12, gap: 12 }}
        columnWrapperStyle={{ gap: 12 }}
      />
    </View>
  );
}
