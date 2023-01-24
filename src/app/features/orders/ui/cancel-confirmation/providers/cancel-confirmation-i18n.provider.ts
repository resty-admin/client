import { getI18nProvider } from "@shared/i18n";

import { CANCEL_CONFIRMATION_I18N } from "../constants";

export const CANCEL_CONFIRMATION_I18N_PROVIDER = getI18nProvider(
	CANCEL_CONFIRMATION_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
