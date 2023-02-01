import { getI18nProvider } from "@shared/i18n";

import { TABLE_PAGE } from "../constants";

export const TABLE_I18N_PROVIDER = getI18nProvider(TABLE_PAGE, (lang) => import(`../i18n/${lang}.json`));
