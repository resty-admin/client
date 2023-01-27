import { getI18nProvider } from "@shared/i18n";

import { CLOSE_CONFIRMATION } from "../constants";

export const CLOSE_CONFIRMATION_I18N_PROVIDER = getI18nProvider(
	CLOSE_CONFIRMATION,
	(lang) => import(`../i18n/${lang}.json`)
);
