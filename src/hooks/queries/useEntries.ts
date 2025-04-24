// useEntries.ts
import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export type Entry = {
  id: string;
  created_at: string;
  end_time: string;
  start_time: string;
  desc?: string;
  categoryId?: string;
  projectId?: string;
  // Add other columns if needed
};
interface FetchEntriesFilters {
  projectId?: string;
  categoryId?: string;
}
const fetchEntries = async (args?: FetchEntriesFilters): Promise<Entry[]> => {
  let q = supabase
    .from("entries")
    .select("*")
    .order("start_time", { ascending: false }); // optional ordering
  if (args?.projectId) {
    console.log("ys")
    q = q.eq("projectId", args.projectId);
  }
  if (args?.categoryId) {
    q = q.eq("categoryId", args.categoryId);
  }
  const { data, error } = await q;
  if (error) throw error;
  return data || [];
};

export const useEntries = (args?: FetchEntriesFilters) => {
  return useQuery<Entry[], Error>({
    queryKey: ["entries", args?.projectId, args?.categoryId],
    queryFn: () => fetchEntries(args),
  });
};
