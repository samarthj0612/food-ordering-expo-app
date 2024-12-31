import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useCartContext } from "@/src/providers/CartProvider";
import CartListItem from "@components/CartListItem";
import Button from "@components/Button";

const CartScreen = () => {
  const { items, total } = useCartContext();

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={styles.totalPrice}>Total: ${total}</Text>
      <Button text="Checkout" />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  totalPrice: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "500",
  },
});
