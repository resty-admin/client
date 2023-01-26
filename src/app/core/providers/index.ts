import { LocationStrategy, PathLocationStrategy } from "@angular/common";

import { FORM_I18N_PROVIDER } from "./form-i18n.provider";

export const CORE_PROVIDERS = [
	FORM_I18N_PROVIDER,
	{
		provide: LocationStrategy,
		useClass: PathLocationStrategy
	}
];
