/**
 * Convert date to YYYYMMDD string format
 *
 * @param   {Date}          date
 * @param   {string|RegExp} sep - separator for the string
 * @returns {string}
 */
export function toYYYYMMDD(date, sep = '-') {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return [year, month, day].join(sep);
};

/**
 * Check if two dates are on the same day
 *
 * @param   {Date} date1
 * @param   {Date} date2
 * @returns {boolean}
 */
export function onSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
