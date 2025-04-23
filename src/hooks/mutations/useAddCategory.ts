import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import supabase from '../../utils/supabase';

type NewCategory = {
  name: string;
  color: string;
};

type Category = {
  id: number;
  name: string;
  color: string;
};

const insertCategory = async (entry: NewCategory): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('categories')
    .insert({
        name: entry.name,
        color: entry.color || '#FFFF'
    })
    .select();

  if (error) throw error;
  return data || [];
};

export const useInsertCategory = (): UseMutationResult<
  Category[],        // returned data
  Error,                // error type
  NewCategory        // argument to mutate()
> => {
  const queryClient = useQueryClient();

  return useMutation<Category[], Error, NewCategory>({
    mutationFn: insertCategory, // ✅ CORRECT way to provide the function
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['categories']});
    },
  });
};
