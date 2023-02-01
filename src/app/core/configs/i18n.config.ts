import { isDevMode } from "@angular/core";
import { environment } from "@env/environment";

export const I18N_CONFIG = {
	prodMode: !isDevMode(),
	url: `${environment.assetsUrl}/i18n`,
	availableLangs: ["uk", "ru", "en"],
	defaultLang: "uk",
	fallbackLang: ["ru", "en"],
	reRenderOnLangChange: true,
	// storage: LocalforageService.storage,
	failedRetries: 3,
	missingHandler: {
		logMissingKey: isDevMode(),
		useFallbackTranslation: true
	}
};
