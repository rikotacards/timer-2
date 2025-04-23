// useUpdateActiveEntry.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../utils/supabase';

type UpdatePayload = {
  id: string;
  name: string;
  color: string;
};

const updateEntry = async ({ id, name, color,  }: UpdatePayload) => {
  const { data, error } = await supabase
    .from('categories')
    .update({ name, color })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
