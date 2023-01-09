import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { I18nModule } from "../../../../../shared/modules/i18n";
import { InputModule } from "../../../../../shared/ui/input";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { WelcomeComponent } from "./layout/welcome.component";
import { WelcomeRoutingModule } from "./welcome-routing.module";

@NgModule({
	declarations: [WelcomeComponent],
	imports: [CommonModule, WelcomeRoutingModule, TypographyModule, InputModule, ReactiveFormsModule, I18nModule],
	exports: [WelcomeComponent]
})
export class WelcomeModule {}
