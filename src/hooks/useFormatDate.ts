import { format } from 'date-fns';

const useFormatDate = (date?: string | Date) => {
  const postDate = format(date ?? new Date(), 'dd. MMM yyyy');
  const iso = new Date(date ?? new Date()).toISOString();

  return { postDate, iso };
};

export default useFormatDate;
