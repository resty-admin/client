import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { TypographyModule } from "@shared/ui/typography";

import { ClientRoutingModule } from "./client-routing.module";
import { CLIENT_COMPONENTS } from "./components";
import { ClientComponent } from "./layout/client.component";

@NgModule({
	declarations: [ClientComponent, ...CLIENT_COMPONENTS],
	imports: [CommonModule, ClientRoutingModule, I18nModule, TypographyModule, ButtonModule],
	exports: [ClientComponent]
})
export class ClientModule {}
