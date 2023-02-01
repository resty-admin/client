import { getI18nProvider } from "@shared/i18n";

import { CREATE_ORDER_PAGE } from "../constants";

export const CREATE_ORDER_PAGE_I18N_PROVIDER = getI18nProvider(
	CREATE_ORDER_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
