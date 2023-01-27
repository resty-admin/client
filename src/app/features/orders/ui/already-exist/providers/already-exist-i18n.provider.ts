import { getI18nProvider } from "@shared/i18n";

import { ALREADY_EXIST } from "../constants";

export const ALREADY_EXIST_I18N_PROVIDER = getI18nProvider(ALREADY_EXIST, (lang) => import(`../i18n/${lang}.json`));
