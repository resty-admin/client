import { getI18nProvider } from "@shared/i18n";

import { CONNECT_TO_ORDER_PAGE_I18N } from "../constants";

export const CONNECT_TO_ORDER_I18N_PROVIDER = getI18nProvider(
	CONNECT_TO_ORDER_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
