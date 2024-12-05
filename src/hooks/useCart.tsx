import { useState, useEffect } from 'preact/hooks';
import { CartItem } from '../models/CartItem';
import { Product } from '../models/Product';



/**
 * Custom hook for managing shopping cart functionality.
 * 
 * This hook provides:
 * - The list of cart items.
 * - The total count of items in the cart.
 * - Methods for adding, removing, clearing, and updating items in the cart.
 * 
 * @returns An object containing:
 * - `cartItems`: The current array of items in the cart.
 * - `cartCount`: The total number of items in the cart.
 * - `handleAddToCart`: Function to add items to the cart.
 * - `handleRemoveItem`: Function to remove an item from the cart by its ID.
 * - `handleClearCart`: Function to clear all items from the cart.
 * - `handleUpdateQuantity`: Function to update the quantity of a specific item in the cart.
 */
export function useCart() {
  const [cartItems, setCart] = useState<CartItem[]>(() => {
    // Initialize cart from localStorage
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  useEffect(() => {
    // Save cart to localStorage on update
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, quantity: number) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    const updatedCart = existingProduct
      ? cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      : [...cartItems, { ...product, quantity }];

    setCart(updatedCart);
  };

  const handleRemoveItem = (id: number) => {
    setCart(cartItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCart(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity || 0, 0);

  return {
    cartItems,
    cartCount,
    handleAddToCart,
    handleRemoveItem,
    handleClearCart,
    handleUpdateQuantity,
  };
}
