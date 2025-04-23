import { useCategories } from "../queries/useCategories";

export const useGetCategoryInfo = (id?: string) => {
  const { data } = useCategories();
  if (!id) {
    return null;
  }
  return data?.find((d) => d.id == id);
};
