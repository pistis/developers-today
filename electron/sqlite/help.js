module.exports = {
  // dateStr : '1995-12-17T03:24:00'
  // https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
  createDateTimeForSQLite(dateStr) {
    return new Date(dateStr).toISOString().replace(/T/, ' ').replace(/\..+/, '');
  },
};
