import { getI18nProvider } from "../../../../../../shared/i18n";
import { TABLE_PAGE_I18N } from "../constants";

export const TABLE_I18N_PROVIDER = getI18nProvider(TABLE_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
