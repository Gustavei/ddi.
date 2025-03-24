import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CartSheet } from "./CartSheet";
import { QuantitySelector } from "./QuantitySelector";
import { PriceDisplay } from "./PriceDisplay";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  discount?: number;
}

export const ProductCard = ({ name, description, price, image, discount }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isJustAdded, setIsJustAdded] = useState(false);
  const { addToCart, getCartItems } = useCart();

  const finalPrice = discount ? price * (1 - discount / 100) : price;

  useEffect(() => {
    if (isJustAdded) {
      const timer = setTimeout(() => {
        setIsJustAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isJustAdded]);

  const handleAddToCart = () => {
    addToCart(name, quantity, finalPrice);
    setQuantity(1);
    setIsJustAdded(true);
  };

  const handleWhatsAppCheckout = () => {
    const currentCart = getCartItems();
    const message = currentCart.map((item) => 
      `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const whatsappMessage = `Resumo do pedido:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/5535988482756?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    localStorage.setItem("cart", "[]");
    setIsCartOpen(false);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={image}
              alt={name}
              className="object-cover w-full h-full"
            />
            {discount && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                {discount}% OFF
              </div>
            )}
          </div>
          <CardTitle className="mt-4 text-lg md:text-xl">{name}</CardTitle>
          <CardDescription className="text-sm">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            <PriceDisplay price={price} discount={discount} finalPrice={finalPrice} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleAddToCart} className="w-full sm:flex-1">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <Button 
            onClick={() => setIsCartOpen(true)} 
            variant={isJustAdded ? "default" : "secondary"} 
            className="w-full sm:flex-1 transition-colors duration-300"
          >
            Ver Carrinho
          </Button>
        </CardFooter>
      </Card>

      <CartSheet 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={getCartItems()}
        onCheckout={handleWhatsAppCheckout}
      />
    </>
  );
};