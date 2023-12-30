const now = new Date();

export const expirationMonthOptions = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
export const expirationYearOptions = ['', ...Array.from({ length: 10 }, (_, index) => index + now.getFullYear())];
export function isExpired ({ month, year }) {
  const expDate = new Date(year, month);
  return expDate < now;
}
