import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { ProductsQueryParams } from '../services/api';

export const useProducts = (params?: ProductsQueryParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => api.getProducts(params).then(res => res.data),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.getProductById(id);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
