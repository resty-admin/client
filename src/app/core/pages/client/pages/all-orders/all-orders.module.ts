import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { AllOrdersRoutingModule } from "./all-orders-routing.module";
import { AllOrdersComponent } from "./layout/all-orders.component";

@NgModule({
	declarations: [AllOrdersComponent],
	imports: [CommonModule, AllOrdersRoutingModule, TypographyModule, IconModule, I18nModule],
	providers: [getI18nProvider("allOrdersPage", (lang) => import(`./i18n/${lang}.json`))]
})
export class AllOrdersModule {}
