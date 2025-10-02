export const formatNumber = (
  num: number | string | null | undefined,
  decimal: number,
): string => {
  if (num == null || num === '') return '0';

  const parsed = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(parsed)) return '0';

  return parsed.toLocaleString('en-US', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });
};
