import { getI18nProvider } from "../../../../../../shared/i18n";
import { HEADER_I18N } from "../constants";

export const HEADER_I18N_PROVIDER = getI18nProvider(HEADER_I18N, (lang) => import(`../i18n/${lang}.json`));
