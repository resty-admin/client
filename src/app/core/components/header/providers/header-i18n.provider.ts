import { getI18nProvider } from "@shared/i18n";

import { HEADER } from "../constants";

export const HEADER_I18N_PROVIDER = getI18nProvider(HEADER, (lang) => import(`../i18n/${lang}.json`));
