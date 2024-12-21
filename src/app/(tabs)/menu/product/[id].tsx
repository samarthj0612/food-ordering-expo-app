import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { useCartContext } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
  const { addItem } = useCartContext();

  const product = products.find((el) => el.id.toString() === id);
  if(!product){
    return (
      <View>
        <Text>No Product Found</Text>
      </View>
    );
  }

  const addToCart = () => {
    console.warn(`You are gonna add ${product.name} of size ${selectedSize}`)
    addItem(product, selectedSize);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image source={{ uri: product?.image }} style={styles.image} />
      <Text style={styles.price}>${product?.price}</Text>
      <Text>Select size-</Text>
      <View style={styles.sizes}>
        {sizes &&
          sizes.length &&
          sizes.map((size, idx) => {
            return (
              <Pressable
                key={idx}
                style={[styles.size , { backgroundColor: selectedSize === size ?  "gainsboro" : "transparent"}]} onPress={() => setSelectedSize(size)}
              >
                <Text style={[ { fontWeight: selectedSize === size ? "bold": "regular" } ]} >{size}</Text>
              </Pressable>
            );
          })}
      </View>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    padding: 12
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
    marginVertical: 18
  },

  size: {
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  }
});
