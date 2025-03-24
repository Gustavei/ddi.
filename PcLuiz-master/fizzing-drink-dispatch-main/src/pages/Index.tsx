import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductGrid } from "@/components/ProductGrid";
import { products } from "@/data/products";
import { useSearch } from "@/hooks/useSearch";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("agua-mineral");
  const allProducts = activeCategory === "todos" 
    ? Object.values(products).flat()
    : products[activeCategory as keyof typeof products] || [];
  
  const { searchQuery, setSearchQuery, filteredItems } = useSearch(allProducts);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
      />
      <main className="container mx-auto px-4 pt-40 md:pt-32 pb-16">
        <ProductGrid products={filteredItems} />
      </main>
    </div>
  );
};

export default Index;