import { FlatList, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

import products from "@assets/data/products";
import ProductCard from "@components/ProductCard";

export default function Menu() {
  return (
    <View>
      <Stack.Screen options={{ title: "Menu" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 12,
    gap: 12,
  },

  columnWrapper: {
    gap: 12,
  },
});
