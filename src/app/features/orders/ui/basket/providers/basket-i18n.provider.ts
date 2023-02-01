import { getI18nProvider } from "@shared/i18n";

import { BAKSET } from "../constants";

export const BAKSET_I18N_PROVIDER = getI18nProvider(BAKSET, (lang) => import(`../i18n/${lang}.json`));
