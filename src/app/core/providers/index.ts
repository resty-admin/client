import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { AUTH_PROVIDERS } from "@features/auth/providers";

import { FORM_I18N_PROVIDER } from "./form-i18n.provider";

export const CORE_PROVIDERS = [
	FORM_I18N_PROVIDER,
	...AUTH_PROVIDERS,
	{
		provide: LocationStrategy,
		useClass: PathLocationStrategy
	}
];
