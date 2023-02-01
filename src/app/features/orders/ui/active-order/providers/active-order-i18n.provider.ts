import { getI18nProvider } from "@shared/i18n";

import { ACTIVE_ORDER } from "../constants";

export const ACTIVE_ORDER_I18N_PROVIDER = getI18nProvider(ACTIVE_ORDER, (lang) => import(`../i18n/${lang}.json`));
