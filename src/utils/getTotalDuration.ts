import { getDuration } from "./getDuration";

// Total time of one or more entries
type Args = {startTime: string, endTime:string}[];
export const getTotalDuration = (args: Args) => {
    let durationMs = 0; 
    args.map((e) => {
        const {durationMs: d} = getDuration(e.startTime, e.endTime)
        durationMs+= d
    })
    const seconds = Math.floor((durationMs / 1000) % 60);
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    return { hours, minutes, seconds, durationMs };
}