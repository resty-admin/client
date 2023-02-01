import { getI18nProvider } from "@shared/i18n";

import { PRODUCTS_ERROR_PAGE } from "../constants";

export const PRODUCTS_ERROR_I18N_PROVIDER = getI18nProvider(
	PRODUCTS_ERROR_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
