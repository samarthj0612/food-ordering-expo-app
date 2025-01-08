import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

import ProductCard from "@components/ProductCard";
import { useProductList } from "@/src/api/products";

export default function Menu() {
  const { data: products, error, isLoading } = useProductList();
  
  if (isLoading) return <ActivityIndicator />

  if (error) return <Text>Failed to fetch the products</Text>

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
