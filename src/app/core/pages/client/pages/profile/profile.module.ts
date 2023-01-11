import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { LinkModule } from "src/app/shared/ui/link";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ThemeModule } from "../../../../../shared/modules/theme";
import { LanguageSelectModule } from "../../../../../shared/ui/language-select";
import { ProfileComponent } from "./layout/profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		ProfileRoutingModule,
		TypographyModule,
		LinkModule,
		InputModule,
		ImageModule,
		I18nModule,
		LanguageSelectModule,
		ThemeModule,
		ReactiveFormsModule
	],
	providers: [getI18nProvider("profilePage", (lang) => import(`./i18n/${lang}.json`)), getI18nProvider("form")]
})
export class ProfileModule {}
