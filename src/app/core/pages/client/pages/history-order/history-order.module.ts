import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PreviewPlaceModule } from "@features/places";
import { ProductsToOrderSelectModule, ProductToOrderModule } from "@features/products";
import { PreviewTableModule } from "@features/tables";
import { UsersSelectModule } from "@features/users";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { HISTORY_ORDER_COMPONENTS } from "./components";
import { HistoryOrderRoutingModule } from "./history-order-routing.module";
import { HistoryOrderComponent } from "./layout/history-order.component";

@NgModule({
	declarations: [HistoryOrderComponent, ...HISTORY_ORDER_COMPONENTS],
	imports: [
		CommonModule,
		HistoryOrderRoutingModule,
		TypographyModule,
		ButtonModule,
		IconModule,
		I18nModule,
		ImageModule,
		ReactiveFormsModule,
		PreviewTableModule,
		ProductToOrderModule,
		UsersSelectModule,
		PreviewPlaceModule,
		ProductsToOrderSelectModule
	]
})
export class HistoryOrderModule {}
