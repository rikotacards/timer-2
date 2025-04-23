export const getDuration = (start: string, end: string) => {
  // Convert to Date objects
  const startDate = new Date(start);
  const endDate = new Date(end);
// Make sure both are valid dates
if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error("Invalid date");
  }
  // Get the duration in milliseconds
  const durationMs: number = endDate.getTime() - startDate.getTime();

  // Convert to readable parts
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  return { hours, minutes, seconds, durationMs };
};
