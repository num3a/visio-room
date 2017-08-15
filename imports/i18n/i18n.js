import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(Cache)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    // wait: true, // globally set to wait for loaded translations in translate hoc

    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: true,

    cache: {
      enabled: false,
      prefix: 'i18next_res_',
      expirationTime: 7*24*60*60*1000,

      versions: {},
    },

    interpolation: {
      // escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      },
    },
  });


export default i18n;
