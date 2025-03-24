import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onCheckout: () => void;
}

export function CartSheet({ isOpen, onClose, items, onCheckout }: CartSheetProps) {
  const { toast } = useToast();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const removeItem = (itemName: string) => {
    const updatedItems = items.filter(item => item.name !== itemName);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    toast({
      title: "Item removido",
      description: `${itemName} foi removido do carrinho`,
    });
    // Force a re-render by closing and opening the cart
    onClose();
    setTimeout(() => onClose(), 100);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 -mx-6 px-6">
            {items.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                Seu carrinho está vazio
              </p>
            ) : (
              items.map((item, index) => (
                <div key={index} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Quantidade: {item.quantity}
                      </p>
                      <p className="font-medium">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {index < items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))
            )}
          </ScrollArea>
          <div className="space-y-4 pt-4">
            <Separator />
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">R$ {total.toFixed(2)}</span>
            </div>
            <Button 
              onClick={onCheckout} 
              className="w-full"
              disabled={items.length === 0}
            >
              Finalizar Pedido
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}