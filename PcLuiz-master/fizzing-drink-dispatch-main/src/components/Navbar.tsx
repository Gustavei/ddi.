import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingCart, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { CartSheet } from "./CartSheet";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "agua-mineral", label: "Água Mineral" },
  { id: "refrigerantes", label: "Refrigerantes" },
  { id: "energeticos", label: "Energéticos & Tônica" },
  { id: "isotonicos", label: "Isotônicos" },
  { id: "achocolatados", label: "Achocolatados" },
  { id: "promocao", label: "Promoção" },
];

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
}

export const Navbar = ({ activeCategory, onCategoryChange, onSearch }: NavbarProps) => {
  const isMobile = useIsMobile();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const itemCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  return (
    <>
      <div className="w-full bg-[#1163DF] shadow-sm fixed top-0 z-50">
        <div className="container mx-auto py-2 px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-4">
                {isMobile && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <button className="text-white">
                        <Menu className="h-6 w-6" />
                      </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] p-0">
                      <div className="flex flex-col p-4 gap-2">
                        <h2 className="text-lg font-bold mb-2">Categorias</h2>
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              onCategoryChange(category.id);
                            }}
                            className={`text-left px-4 py-2 rounded-md ${
                              activeCategory === category.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-secondary"
                            }`}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src="/lovable-uploads/5c2e0b38-b14c-433c-90b3-c4035aa896b5.png"
                    alt="Distribuidora Dois Irmãos"
                    className="h-12 w-auto"
                  />
                  <span className="text-xl font-bold text-white hidden md:inline">
                    Distribuidora Dois Irmãos
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative md:block w-48">
                  <Input
                    type="search"
                    placeholder="Buscar produtos..."
                    className="pl-8 bg-white w-full"
                    onChange={(e) => onSearch(e.target.value)}
                  />
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <button 
                  className="relative" 
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart 
                    className={`h-6 w-6 ${itemCount > 0 ? 'text-yellow-400' : 'text-white'}`} 
                  />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-black font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
            {!isMobile && (
              <Tabs value={activeCategory} onValueChange={onCategoryChange} className="w-full">
                <TabsList className="w-full justify-between bg-white">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>
        </div>
      </div>

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onCheckout={() => {
          const message = cartItems.map((item: any) => 
            `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
          ).join('\n');
          
          const total = cartItems.reduce((sum: number, item: any) => 
            sum + (item.price * item.quantity), 0
          );
          
          const whatsappMessage = `Resumo do pedido:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}`;
          const whatsappUrl = `https://wa.me/5535988482756?text=${encodeURIComponent(whatsappMessage)}`;
          
          window.open(whatsappUrl, '_blank');
          localStorage.setItem("cart", "[]");
          setIsCartOpen(false);
        }}
      />
    </>
  );
};
