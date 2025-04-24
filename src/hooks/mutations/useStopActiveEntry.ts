import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import { useSnackbar } from "notistack";
import { SUC_STOP_ACTIVITY } from "../../strings";

type ActiveEntry = {
  id: string;
  desc?: string;
  startTime: string;
  endTime: Date;
  projectId?: string;
  categoryId?: string;
};

const stopActiveEntry = async (entry: ActiveEntry): Promise<ActiveEntry[]> => {
  try {
    const { error: deleteError } = await supabase
      .from("activeEntry")
      .delete()
      .eq("id", entry.id);
    if (deleteError) {
      throw deleteError;
    }
    const { data, error } = await supabase
      .from("entries")
      .insert({
        desc: entry.desc,
        start_time: entry.startTime,
        end_time: entry.endTime,
        projectId: entry.projectId,
        categoryId: entry.categoryId
      })
    if (error) {
      throw error;
    }
    return data || [];
  } catch (e) {
    console.log(e);
    return []
  }
};

export const useStopActiveEntry = (): UseMutationResult<
  ActiveEntry[], // returned data
  Error, // error type
  ActiveEntry // argument to mutate()
> => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar();

  return useMutation<ActiveEntry[], Error, ActiveEntry>({
    mutationFn: stopActiveEntry, // ✅ CORRECT way to provide the function
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeEntry", "entries"] });
      enqueueSnackbar(SUC_STOP_ACTIVITY, {variant: 'success'})
    },
  });
};
