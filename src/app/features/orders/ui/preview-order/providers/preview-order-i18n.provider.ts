import { getI18nProvider } from "@shared/i18n";

import { PREVIEW_ORDER } from "../constants";

export const PREVIEW_ORDER_I18N_PROVIDER = getI18nProvider(PREVIEW_ORDER, (lang) => import(`../i18n/${lang}.json`));
