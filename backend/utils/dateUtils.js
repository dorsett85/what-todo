/**
 * Add UTC timezone offset
 *
 * @param   {Date} date
 * @returns {Date}
 */
const offsetUTCTimeZone = date => {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

module.exports = {
  offsetUTCTimeZone
};
