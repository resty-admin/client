import { getI18nProvider } from "@shared/i18n";

import { PAYMENT_TYPE_PAGE } from "../constants";

export const PAYMENT_TYPE_I18N_PROVIDER = getI18nProvider(PAYMENT_TYPE_PAGE, (lang) => import(`../i18n/${lang}.json`));
