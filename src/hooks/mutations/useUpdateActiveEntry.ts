// useUpdateActiveEntry.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../utils/supabase';
import { useSnackbar } from 'notistack';
import { SUC_UPDATE_ACTIVE_ENTRY } from '../../strings';

type UpdatePayload = {
  id: string;
  description?: string;
  categoryId?: string;
  projectId?: string;
};

const updateActiveEntry = async ({ id, description, projectId, categoryId }: UpdatePayload) => {
  const { data, error } = await supabase
    .from('activeEntry')
    .update({ desc:description, projectId, categoryId })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

export const useUpdateActiveEntry = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();
  return useMutation({
    mutationFn: updateActiveEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeEntry'] });
      enqueueSnackbar(SUC_UPDATE_ACTIVE_ENTRY, {variant: 'success'})
    },
  });
};
