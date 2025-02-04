export function getCurrentDateAtMidnight() {
  const currentDate = new Date();

  // Set the time to 00:00:00.000
  currentDate.setHours(0, 0, 0, 0);

  // Return the ISO string in format 'YYYY-MM-DDT00:00:00.000Z'
  return currentDate.toISOString();
}
