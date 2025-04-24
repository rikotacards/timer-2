// useUpdateActiveEntry.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../utils/supabase';

type UpdatePayload = {
  id: string;
  description?: string;
  startTime?: string | null;
  endTime?: string;
  categoryId?: string;
  projectId?: string;
};

const updateEntry = async ({ id, description, startTime, endTime, categoryId, projectId }: UpdatePayload) => {
  const { data, error } = await supabase
    .from('entries')
    .update({ desc:description, start_time: startTime, end_time: endTime, categoryId, projectId })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

export const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
};
