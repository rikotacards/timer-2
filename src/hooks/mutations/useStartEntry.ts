import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import supabase from '../../utils/supabase';
import { useSnackbar } from 'notistack';
import { SUC_START_ACTIVITIY } from '../../strings';

type NewActiveEntry = {
  description: string;
  projectId?: string;
  categoryId?: string;
};

type ActiveEntry = {
  id: string;
  description: string;
  created_at: string;
};

const insertActiveEntry = async (entry: NewActiveEntry): Promise<ActiveEntry[]> => {
  const { data, error } = await supabase
    .from('activeEntry')
    .insert({
        start_time: new Date(),
        desc: entry.description, 
        categoryId: entry.categoryId,
        projectId: entry.projectId
    })
    .select();

  if (error) throw error;
  return data || [];
};

export const useInsertActiveEntry = (): UseMutationResult<
  ActiveEntry[],        // returned data
  Error,                // error type
  NewActiveEntry        // argument to mutate()
> => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar()
  return useMutation<ActiveEntry[], Error, NewActiveEntry>({
    mutationFn: insertActiveEntry, // ✅ CORRECT way to provide the function
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['activeEntry']});
      enqueueSnackbar(SUC_START_ACTIVITIY, {variant: 'success'})
    },
  });
};
