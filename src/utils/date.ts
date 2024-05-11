import { format } from 'date-fns';

export const formatDate = (date: string | Date | undefined) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd');
};

export const formatISODate = (date: string | Date | undefined) => {
  if (!date) return undefined;
  return new Date(date).toISOString();
};
