import { getI18nProvider } from "@shared/i18n";

import { CANCEL_CONFIRMATION } from "../constants";

export const CANCEL_CONFIRMATION_I18N_PROVIDER = getI18nProvider(
	CANCEL_CONFIRMATION,
	(lang) => import(`../i18n/${lang}.json`)
);
