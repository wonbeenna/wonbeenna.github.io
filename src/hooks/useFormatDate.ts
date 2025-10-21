import { formatDateForHumanLong } from '@/utils/formatDateForHumanLong';

const useFormatDate = (date?: string | Date) => {
  const postDate = formatDateForHumanLong(date ?? new Date());
  const iso = new Date(date ?? new Date()).toISOString();

  return { postDate, iso };
};

export default useFormatDate;
