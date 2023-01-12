import { getI18nProvider } from "src/app/shared/i18n";

import { DASHBOARD_PAGE_I18N } from "../constants";

export const DASHOARD_I18N_PROVIDER = getI18nProvider(DASHBOARD_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
