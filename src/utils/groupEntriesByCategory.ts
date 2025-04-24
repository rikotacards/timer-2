import { Entry } from "../hooks/queries/useEntries";

export const groupEntriesByCategory = (entries: Entry[]) => {
    const dates:{[key: string]: Entry[]} = {};
    entries.forEach((e) => {
        if(e.categoryId === undefined){
            return;
        }
        if(dates[e.categoryId]){
            dates[e.categoryId].push(e)
        } else {
            dates[e.categoryId] = [e]
        }
    })
    return dates
}