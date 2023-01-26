import { getI18nProvider } from "@shared/i18n";

import { PREVIEW_ORDER_I18N } from "../constants";

export const PREVIEW_ORDER_I18N_PROVIDER = getI18nProvider(
	PREVIEW_ORDER_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
