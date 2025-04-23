import { Entry } from "../hooks/queries/useEntries";

export const groupEntriesByDate = (entries: Entry[]) => {
    const dates:{[key: string]: Entry[]} = {};
    entries.forEach((e) => {
        const startDate = new Date(e.start_time).toDateString();

        if(dates[startDate]){
            dates[startDate].push(e)
        } else {
            dates[startDate] = [e]
        }
    })
    return dates
}