import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { ThemeModule } from "@shared/modules/theme";
import { ActionsModule } from "@shared/ui/actions";
import { ActiveOrderModule } from "@shared/ui/active-order";
import { ButtonModule } from "@shared/ui/button";
import { ChipModule } from "@shared/ui/chip";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { LanguageSelectModule } from "@shared/ui/language-select";
import { LinkModule } from "@shared/ui/link";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { ClientRoutingModule } from "./client-routing.module";
import { CLIENT_COMPONENTS } from "./components";
import { ClientComponent } from "./layout/client.component";

@NgModule({
	declarations: [ClientComponent, ...CLIENT_COMPONENTS],
	imports: [
		CommonModule,
		ClientRoutingModule,
		IconModule,
		TypographyModule,
		InputModule,
		ButtonModule,
		ChipModule,
		ThemeModule,
		ImageModule,
		LanguageSelectModule,
		PipesModule,
		ActionsModule,
		I18nModule,
		TooltipModule,
		DirectivesModule,
		LinkModule,
		ActiveOrderModule
	],
	exports: [ClientComponent]
})
export class ClientModule {}
