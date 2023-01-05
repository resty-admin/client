import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "src/app/shared/modules/pipes";
import { ThemeModule } from "src/app/shared/modules/theme";
import { ButtonModule } from "src/app/shared/ui/button";
import { ChipModule } from "src/app/shared/ui/chip";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { LanguageSelectModule } from "src/app/shared/ui/language-select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { DirectivesModule } from "../../../shared/modules/directives";
import { I18nModule } from "../../../shared/modules/i18n";
import { ActionsModule } from "../../../shared/ui/actions";
import { LinkModule } from "../../../shared/ui/link";
import { TooltipModule } from "../../../shared/ui/tooltip";
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
		LinkModule
	],
	exports: [ClientComponent]
})
export class ClientModule {}
