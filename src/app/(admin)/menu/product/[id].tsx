import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PizzaSize } from "@/src/types";
import Colors from "@/src/constants/Colors";
import Button from "@/src/components/Button";
import { useProduct } from "@/src/api/products";
import { useCartContext } from "@/src/providers/CartProvider";
import { defaultPizzaImage } from "@/src/components/ProductCard";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const router = useRouter();
  const { addItem } = useCartContext();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  if (!product) {
    return (
      <View>
        <Text>No Product Found</Text>
      </View>
    );
  }

  const addToCart = () => {
    console.warn(`You are gonna add ${product.name} of size ${selectedSize}`);
    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: product?.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable onPress={() => console.debug("PRESSED")}>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Image
        source={{ uri: product?.image ?? defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.price}>${product?.price}</Text>
      <Text>Select size-</Text>
      <View style={styles.sizes}>
        {sizes &&
          sizes.length &&
          sizes.map((size, idx) => {
            return (
              <Pressable
                key={idx}
                style={[
                  styles.size,
                  {
                    backgroundColor:
                      selectedSize === size ? "gainsboro" : "transparent",
                  },
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    { fontWeight: selectedSize === size ? "bold" : "regular" },
                  ]}
                >
                  {size}
                </Text>
              </Pressable>
            );
          })}
      </View>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 18,
  },

  size: {
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
});
