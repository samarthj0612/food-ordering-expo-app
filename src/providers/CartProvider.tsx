import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
};

export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const handleAddItem = (product: Product, size: CartItem["size"]) => {
    const existingCartItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existingCartItem) {
      handleUpdateQuantity(existingCartItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product: product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const handleUpdateQuantity = (itemId: string, quantity: -1 | 1) => {
    setItems(
      items
        .map((item) => {
          return item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + quantity };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items: items,
        addItem: handleAddItem,
        updateQuantity: handleUpdateQuantity,
        total: total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

export default CartProvider;
