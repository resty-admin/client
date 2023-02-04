import type { ACCESS_TOKEN } from "@shared/constants";
import type { LanguagesEnum } from "@shared/enums";
import type { ThemeEnum } from "@shared/enums";

export interface IAuthState {
	[ACCESS_TOKEN]?: string;
	theme: ThemeEnum;
	language: LanguagesEnum;
}
