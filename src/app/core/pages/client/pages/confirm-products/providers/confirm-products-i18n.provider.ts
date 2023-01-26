import { getI18nProvider } from "@shared/i18n";

import { CONFIRM_PRODUCTS_PAGE } from "../constants";

export const CONFIRM_PRODUCTS_I18N_PROVIDER = getI18nProvider(
	CONFIRM_PRODUCTS_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
