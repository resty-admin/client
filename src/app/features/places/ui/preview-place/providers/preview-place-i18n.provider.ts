import { getI18nProvider } from "@shared/i18n";

import { PREVIEW_PLACE_I18N } from "../constants";

export const PREVIEW_PLACE_I18N_PROVIDER = getI18nProvider(
	PREVIEW_PLACE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
