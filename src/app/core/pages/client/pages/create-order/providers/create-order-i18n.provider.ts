import { getI18nProvider } from "@shared/i18n";

import { CREATE_ORDER_PAGE_I18N } from "../constants";

export const CREATE_ORDER_PAGE_I18N_PROVIDER = getI18nProvider(
	CREATE_ORDER_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
