import { getI18nProvider } from "../../../../../../shared/i18n";
import { REFERRAL_LINK_PAGE_I18N } from "../constants";

export const REFERRAL_LINK_I18N_PROVIDER = getI18nProvider(
	REFERRAL_LINK_PAGE_I18N,
	(lang) => import(`../i18n/${lang}.json`)
);
