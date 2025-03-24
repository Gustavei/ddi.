import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

export const useCart = () => {
  const { toast } = useToast();

  const addToCart = (name: string, quantity: number, price: number) => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = currentCart.findIndex((item: CartItem) => item.name === name);
    
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push({ name, quantity, price });
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    toast({
      title: "Produto adicionado ao carrinho",
      description: `${quantity}x ${name} adicionado ao carrinho`,
    });
  };

  const getCartItems = (): CartItem[] => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  };

  const clearCart = () => {
    localStorage.setItem("cart", "[]");
  };

  return { addToCart, getCartItems, clearCart };
};