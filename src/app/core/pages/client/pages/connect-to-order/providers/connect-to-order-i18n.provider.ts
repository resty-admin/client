import { getI18nProvider } from "@shared/i18n";

import { CONNECT_TO_ORDER_PAGE } from "../constants";

export const CONNECT_TO_ORDER_I18N_PROVIDER = getI18nProvider(
	CONNECT_TO_ORDER_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
