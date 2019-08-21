/**
 * Convert date to YYYYMMDD string format
 *
 * @param   {Date}          date
 * @param   {string|RegExp} sep - separator for the string
 * @returns {string}
 */
export function toYYYYMMDD(date, sep = '-') {
  if (!date) {
    date = new Date();
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = month > 9 ? month : '0' + month;
  day = day > 9 ? day : '0' + day;
  return [year, month, day].join(sep);
}

/**
 * Convert date to HH:MM AM/PM string format
 *
 * @param   {Date} date
 * @returns {string}
 */
export function toHHMM(date) {
  if (!date) {
    date = new Date();
    date.setMinutes(0);
  }
  return date.toLocaleString('en-US', { timeStyle: 'short' });
}

/**
 * Generate array of strings formatted to HH:MM AM/PM at 15 minute intervals
 *
 * @returns {string[]}
 */
export const generateTime15MinSteps = () => {
  const times = [];
  const date = new Date(new Date().toDateString());
  const day = date.getDate();
  while (day === date.getDate()) {
    const timeDay = toHHMM(date);
    times.push(timeDay);
    date.setMinutes(date.getMinutes() + 15);
  }
  return times;
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
