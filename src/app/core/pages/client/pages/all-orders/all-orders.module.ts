import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../shared/modules/i18n";
import { AllOrdersRoutingModule } from "./all-orders-routing.module";
import { AllOrdersComponent } from "./layout/all-orders.component";
import { ALL_ORDERS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AllOrdersComponent],
	imports: [CommonModule, AllOrdersRoutingModule, TypographyModule, IconModule, I18nModule],
	providers: ALL_ORDERS_PROVIDERS
})
export class AllOrdersModule {}
