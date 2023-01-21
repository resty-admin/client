import { getI18nProvider } from "@shared/i18n";

import { CONNECT_TO_TABLE_PAGE_I18N } from "../constants";

export const CONNECT_TO_TABLE_I18N_PROVIDER = getI18nProvider(
	CONNECT_TO_TABLE_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
