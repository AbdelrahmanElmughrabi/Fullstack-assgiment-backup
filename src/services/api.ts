import { Product } from '../data/products';
import { products } from '../data/products';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ProductsQueryParams {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
  limit?: number;
  offset?: number;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const GOLD_API_URL = 'https://www.goldapi.io/api/XAU/USD';
const GOLD_API_KEY = import.meta.env.VITE_GOLDAPI_KEY;

async function fetchGoldPrice(): Promise<number> {
  try {
    const response = await fetch(GOLD_API_URL, {
      headers: {
        'x-access-token': GOLD_API_KEY,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch gold price');
    const data = await response.json();
    return data.price_gram_24k;
  } catch (error) {
    // Fallback to a default value if API fails
    return 65.5;
  }
}

// Mock RESTful API endpoints
export const api = {
  // GET /api/products
  getProducts: async (params?: ProductsQueryParams): Promise<ApiResponse<Product[]>> => {
    await delay(500); // Simulate network delay
    
    let filteredProducts = [...products];
    
    // Apply filters if provided
    if (params) {
      if (params.minPopularity !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.popularityScore >= params.minPopularity!);
      }
      if (params.maxPopularity !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.popularityScore <= params.maxPopularity!);
      }
      
      // Apply pagination
      if (params.offset !== undefined) {
        filteredProducts = filteredProducts.slice(params.offset);
      }
      if (params.limit !== undefined) {
        filteredProducts = filteredProducts.slice(0, params.limit);
      }
    }

    // Fetch real-time gold price
    const goldPrice = await fetchGoldPrice();

    // Calculate price for each product
    const productsWithPrice = filteredProducts.map(product => ({
      ...product,
      price: (product.popularityScore + 1) * product.weight * goldPrice,
    }));
    
    return {
      data: productsWithPrice,
      status: 200,
      message: 'Products retrieved successfully'
    };
  },

  // GET /api/products/:id
  getProductById: async (id: number): Promise<ApiResponse<Product | null>> => {
    await delay(300);
    
    const product = products[id] || null;
    
    if (!product) {
      return {
        data: null,
        status: 404,
        message: 'Product not found'
      };
    }
    
    return {
      data: product,
      status: 200,
      message: 'Product retrieved successfully'
    };
  },

  // GET /api/gold-price
  getGoldPrice: async (): Promise<ApiResponse<{ price: number; timestamp: string }>> => {
    await delay(200);
    let price = 65.5;
    try {
      price = await fetchGoldPrice();
    } catch (e) {
      // fallback already handled in fetchGoldPrice
    }
    return {
      data: {
        price,
        timestamp: new Date().toISOString()
      },
      status: 200,
      message: 'Gold price retrieved successfully'
    };
  }
};

// Hook to use the products API
export const useProductsApi = () => {
  return {
    getProducts: api.getProducts,
    getProductById: api.getProductById,
    getGoldPrice: api.getGoldPrice
  };
};
