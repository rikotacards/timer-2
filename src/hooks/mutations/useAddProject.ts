import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import supabase from '../../utils/supabase';
import {Project} from '../../types'
type NewProject = {
  name: string;
  color: string;
};



const addProject = async (project: NewProject): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .insert({
        name: project.name,
        color: project.color
    })
    .select();

  if (error) throw error;
  return data || [];
};

export const useAddProject = (): UseMutationResult<
  Project[],        // returned data
  Error,                // error type
  NewProject        // argument to mutate()
> => {
  const queryClient = useQueryClient();

  return useMutation<Project[], Error, NewProject>({
    mutationFn: addProject, // ✅ CORRECT way to provide the function
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['projects']});
    },
  });
};
