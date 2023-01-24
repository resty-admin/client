import { getI18nProvider } from "@shared/i18n";

import { ALREADY_EXIST_I18N } from "../constants";

export const ALREADY_EXIST_I18N_PROVIDER = getI18nProvider(
	ALREADY_EXIST_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
