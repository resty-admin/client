import { getI18nProvider } from "@shared/i18n";

import { PREVIEW_PLACE } from "../constants";

export const PREVIEW_PLACE_I18N_PROVIDER = getI18nProvider(PREVIEW_PLACE, (lang) => import(`../i18n/${lang}.json`));
