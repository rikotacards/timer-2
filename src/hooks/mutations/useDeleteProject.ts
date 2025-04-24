import {
    useMutation,
    useQueryClient,
    UseMutationResult,
  } from "@tanstack/react-query";
  import supabase from "../../utils/supabase";
  
  type ActiveEntry = {
    id: string;
  };
  
  const stopActiveEntry = async (entry: ActiveEntry): Promise<void> => {
    try {
     
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", entry.id)
      if (error) {
        throw error;
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const useDeleteProject = (): UseMutationResult<
    void, // returned data
    Error, // error type
    ActiveEntry // argument to mutate()
  > => {
    const queryClient = useQueryClient();
  
    return useMutation<void, Error, ActiveEntry>({
      mutationFn: stopActiveEntry, // ✅ CORRECT way to provide the function
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
    });
  };
  