// useEntries.ts
import { useQuery } from '@tanstack/react-query';
import supabase from '../../utils/supabase';

export type Entry = {
  id: string;
  created_at: string;
  start_time: string;
  desc?: string;
  projectId?: string;
  categoryId?: string;
  // Add other columns if needed
};

const fetchActiveEntries = async (): Promise<Entry[]> => {
  const { data, error } = await supabase
    .from('activeEntry')
    .select('*')
    .order('start_time', { ascending: false }); // optional ordering

  if (error) throw error;
  return data || [];
};

export const useActiveEntries = () => {
  return useQuery<Entry[], Error>({
    queryKey: ['activeEntry', "entries"],
    queryFn: fetchActiveEntries,
  });
};