export const formatDateForHumanLong = (dateValue: string | Date): string => {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}. ${monthName} ${year}`;
};
