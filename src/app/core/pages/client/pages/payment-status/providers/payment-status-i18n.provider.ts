import { getI18nProvider } from "@shared/i18n";

import { PAYMENT_STATUS_PAGE } from "../constants";

export const PAYMENT_STATUS_I18N_PROVIDER = getI18nProvider(
	PAYMENT_STATUS_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
