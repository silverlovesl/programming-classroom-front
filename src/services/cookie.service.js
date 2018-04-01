import { Cookies } from 'quasar';
import { DEF } from '../defination';

export const CookieService = {
  getAuthToken: () => Cookies.get(DEF.AuthTokenCookieKey),
  setAuthToken: (value) => Cookies.set(DEF.AuthTokenCookieKey, value, { expires: 8 }),
  deleteAuthToken: () => { Cookies.set(DEF.AuthTokenCookieKey, "", { expires: -1 }) },
  getLang: () => Cookies.get(DEF.LanguageCookieKey),
  setLang: (value) => Cookies.set(DEF.LanguageCookieKey, value, { expires: 365 })
}