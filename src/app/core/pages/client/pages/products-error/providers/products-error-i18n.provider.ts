import { getI18nProvider } from "@shared/i18n";

import { PRODUCTS_ERROR_PAGE_I18N } from "../constants";

export const PRODUCTS_ERROR_I18N_PROVIDER = getI18nProvider(
	PRODUCTS_ERROR_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
