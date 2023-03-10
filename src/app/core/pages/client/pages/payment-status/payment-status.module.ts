import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CloseConfirmationModule } from "@features/orders/ui";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { PAYMENT_STATUS_COMPONENTS } from "./components";
import { PaymentStatusComponent } from "./layout/payment-status.component";
import { PaymentStatusRoutingModule } from "./payment-status-routing.module";

@NgModule({
	declarations: [PaymentStatusComponent, ...PAYMENT_STATUS_COMPONENTS],
	imports: [
		CommonModule,
		PaymentStatusRoutingModule,
		TypographyModule,
		IconModule,
		ImageModule,
		ButtonModule,
		I18nModule,
		CloseConfirmationModule
	]
})
export class PaymentStatusModule {}
