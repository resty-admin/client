import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ProductToOrderModule } from "../../../../../features/products";
import { PreviewTableModule } from "../../../../../features/tables";
import { UsersSelectModule } from "../../../../../features/users/ui/users-select/users-select.module";
import { getI18nProvider } from "../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../../shared/ui/button";
import { IconModule } from "../../../../../shared/ui/icon";
import { ImageModule } from "../../../../../shared/ui/image";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { HistoryOrderRoutingModule } from "./history-order-routing.module";
import { HistoryOrderComponent } from "./layout/history-order.component";

@NgModule({
	declarations: [HistoryOrderComponent],
	imports: [
		CommonModule,
		HistoryOrderRoutingModule,
		TypographyModule,
		ButtonModule,
		IconModule,
		TranslocoModule,
		ImageModule,
		ReactiveFormsModule,
		PreviewTableModule,
		ProductToOrderModule,
		UsersSelectModule
	],
	providers: [getI18nProvider("historyOrderPage", (lang) => import(`./i18n/${lang}.json`))]
})
export class HistoryOrderModule {}
