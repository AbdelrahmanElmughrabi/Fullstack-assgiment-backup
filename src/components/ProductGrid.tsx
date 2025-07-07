import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const ProductGrid = () => {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-wide">
            Our Collection
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover our curated selection of engagement rings, where traditional craftsmanship 
            meets contemporary design. Each piece is meticulously crafted to capture the essence of your commitment.
          </p>
        </div>

        {/* Product Carousel */}
        <div className="max-w-7xl mx-auto">
          {isLoading && <div className="text-center py-10">Loading products...</div>}
          {isError && <div className="text-center py-10 text-red-500">Failed to load products.</div>}
          {products && (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {products.map((product, index) => (
                  <CarouselItem key={`${product.name}-${index}`} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <ProductCard product={product} productIndex={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-white hover:bg-gray-50 border-gray-200 text-gray-700" />
              <CarouselNext className="right-4 bg-white hover:bg-gray-50 border-gray-200 text-gray-700" />
            </Carousel>
          )}
        </div>

        {/* Pricing Info */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-3xl p-12 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-wide">
              Transparent Pricing
            </h3>
            <p className="text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
              Our pricing reflects real-time gold market values, ensuring fair and transparent costs. 
              Each ring is priced using our formula: <span className="font-medium">(Popularity Score + 1) × Weight × Current Gold Price</span>, 
              providing you with honest, market-based pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
