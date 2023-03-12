import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ActiveOrderModule } from "@features/orders";
import { BasketModule } from "@features/orders/ui/basket";
import { TippyDirective } from "@ngneat/helipopper";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { LinkModule } from "@shared/ui/link";
import { NavigationSkeletonModule } from "@shared/ui/navigation-skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { ClientRoutingModule } from "./client-routing.module";
import { CLIENT_COMPONENTS } from "./components";
import { ClientComponent } from "./layout/client.component";

@NgModule({
	declarations: [ClientComponent, ...CLIENT_COMPONENTS],
	imports: [
		CommonModule,
		ClientRoutingModule,
		I18nModule,
		TypographyModule,
		ButtonModule,
		NavigationSkeletonModule,
		ActionsModule,
		PipesModule,
		IconModule,
		BasketModule,
		ActiveOrderModule,
		ImageModule,
		TippyDirective,
		DirectivesModule,
		LinkModule
	]
})
export class ClientModule {}
