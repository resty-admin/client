import { getI18nProvider } from "@shared/i18n";

import { PRODUCT_PAGE } from "../constants";

export const PRODUCT_I18N_PROVIDER = getI18nProvider(PRODUCT_PAGE, (lang) => import(`../i18n/${lang}.json`));
