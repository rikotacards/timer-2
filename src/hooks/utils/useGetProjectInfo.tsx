import { useProjects } from "../queries/useProjects";

export const useGetProjectInfo = (id?: string) => {
  const { data } = useProjects();
  if (!id) {
    return null;
  }
  return data?.find((d) => d.id == id);
};
