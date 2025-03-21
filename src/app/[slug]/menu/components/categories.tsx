'use client'

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      menuCategories: {
        include: { products: true };
      };
    };
  }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: {
    products: true
  }
}> 

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0])

  const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
    setSelectedCategory(category)
  }

  const getCategoryButtonVariants = (category: MenuCategoriesWithProducts) => {
    return category.id === selectedCategory.id ? 'default' : 'secondary'
  }

  return (
    <div className="relative z-50 mt-[1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            height={45}
            width={45}
            />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto!</p>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map(categoria => (
            <Button key={categoria.id} variant={getCategoryButtonVariants(categoria)} size='sm' className="rounded-full" onClick={() => handleCategoryClick(categoria)}>
              {categoria.name}
            </Button>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 font-semibold pt-2">{selectedCategory.name}</h3>
      <Products products={selectedCategory.products}/>
    </div>
  );
};

export default RestaurantCategories;
