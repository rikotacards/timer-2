import { Entry } from "../hooks/queries/useEntries";

export const groupEntriesByCategory = (entries: Entry[]) => {
    const dates:{[key: string]: Entry[]} = {};
    entries.forEach((e) => {
        if(e.category === undefined){
            return;
        }
        if(dates[e.category]){
            dates[e.category].push(e)
        } else {
            dates[e.category] = [e]
        }
    })
    return dates
}