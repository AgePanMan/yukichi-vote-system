const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const path = require('path');

i18next.use(Backend).init({
  fallbackLng: 'ja',
  preload: ['ja', 'en'],
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    loadPath: path.join(__dirname, '../../frontend/public/locales/{{lng}}/translation.json')
  }
});

module.exports = i18next;
