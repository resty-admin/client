import { getI18nProvider } from "../../../../../../shared/i18n";
import { PRODUCT_PAGE_I18N } from "../constants";

export const PRODUCT_I18N_PROVIDER = getI18nProvider(PRODUCT_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`));
