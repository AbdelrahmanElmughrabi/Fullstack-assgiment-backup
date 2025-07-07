
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export const useGoldPrice = () => {
  return useQuery({
    queryKey: ['goldPrice'],
    queryFn: async () => {
      const response = await api.getGoldPrice();
      console.log('Fetching gold price...', response.data.price);
      return response.data.price;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
