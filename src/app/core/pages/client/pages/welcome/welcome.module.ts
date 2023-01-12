import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { InputModule } from "../../../../../shared/ui/input";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { FORM_I18N } from "../../../../constants";
import { WELCOME_PAGE_I18N } from "./constants";
import { WelcomeComponent } from "./layout/welcome.component";
import { WelcomeRoutingModule } from "./welcome-routing.module";

@NgModule({
	declarations: [WelcomeComponent],
	imports: [CommonModule, WelcomeRoutingModule, TypographyModule, InputModule, ReactiveFormsModule, I18nModule],
	providers: [getI18nProvider(FORM_I18N), getI18nProvider(WELCOME_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class WelcomeModule {}
