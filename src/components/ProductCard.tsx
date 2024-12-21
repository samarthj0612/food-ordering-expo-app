import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "@constants/Colors";
import { Product } from "../types";
import { Link } from "expo-router";

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductCardProps = {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {

  return (
    <Link href={`/menu/product/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: product.image || defaultPizzaImage, }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8,
    boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.500)",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
  },

  title: {
    color: Colors.light.text,
    fontSize: 18,
    fontWeight: 800,
  },

  price: {
    color: Colors.light.tint,
    fontSize: 14,
  },
});
