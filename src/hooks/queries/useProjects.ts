// useEntries.ts
import { useQuery } from '@tanstack/react-query';
import supabase from '../../utils/supabase';
import {  Project } from '../../types';



const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('name', { ascending: false }); // optional ordering

  if (error) throw error;
  return data || [];
};

export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
};