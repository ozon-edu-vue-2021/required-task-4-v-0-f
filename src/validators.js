export default {
  russianLetters: function (text) {
    return /[а-яА-я]+/.test(text);
  },
  date: function (date) {
    try {
      const [, day, month, year] = date.match(/(\d{2}).(\d{2})\.(\d{4})/);
      const validDate = new Date(year, Number(month) - 1, day);
      if (validDate && validDate < new Date()) return true;
    } catch {
      return false;
    }
    return false;
  },
  email: function (email) {
    return /.+@.+\..+/.test(email);
  },
  passportSeries: function (number) {
    return /\d{4}/.test(number);
  },
  passportNumberRu: function (number) {
    return /\d{6}/.test(number);
  },
  passportNumber: function (number) {
    return number.length > 0;
  },
  englishLetters: function (text) {
    return /[a-zA-Z]+/.test(text);
  },
};
