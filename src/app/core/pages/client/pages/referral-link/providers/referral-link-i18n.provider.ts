import { getI18nProvider } from "@shared/i18n";

import { REFERRAL_LINK_PAGE } from "../constants";

export const REFERRAL_LINK_I18N_PROVIDER = getI18nProvider(
	REFERRAL_LINK_PAGE,
	(lang) => import(`../i18n/${lang}.json`)
);
