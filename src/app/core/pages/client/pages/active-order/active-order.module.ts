import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ProductToOrderModule } from "../../../../../features/products";
import { UsersSelectModule } from "../../../../../features/users/ui/users-select/users-select.module";
import { getI18nProvider } from "../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../../shared/ui/button";
import { IconModule } from "../../../../../shared/ui/icon";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { ActiveOrderRoutingModule } from "./active-order-routing.module";
import { ActiveOrderComponent } from "./layout/active-order.component";

@NgModule({
	declarations: [ActiveOrderComponent],
	imports: [
		CommonModule,
		ActiveOrderRoutingModule,
		TypographyModule,
		ButtonModule,
		IconModule,
		TranslocoModule,
		ReactiveFormsModule,
		ProductToOrderModule,
		UsersSelectModule
	],
	providers: [getI18nProvider("activeOrderPage", (lang) => import(`./i18n/${lang}.json`))]
})
export class ActiveOrderModule {}
