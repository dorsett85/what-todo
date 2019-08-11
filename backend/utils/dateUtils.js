/**
 * Add UTC timezone offset
 *
 * @param   {Date}   date
 * @param   {number} offset - utc offset in minutes
 * @returns {Date}
 */
const offsetUTCTimeZone = (date, offset) => {
  return new Date(date.getTime() + offset * 60000);
};

module.exports = {
  offsetUTCTimeZone
};
