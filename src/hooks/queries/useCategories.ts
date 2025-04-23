// useEntries.ts
import { useQuery } from '@tanstack/react-query';
import supabase from '../../utils/supabase';
import { Category } from '../../types';



const fetchEntries = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: false }); // optional ordering

  if (error) throw error;
  return data || [];
};

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: fetchEntries,
  });
};