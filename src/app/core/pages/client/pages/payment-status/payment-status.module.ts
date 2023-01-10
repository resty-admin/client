import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { PaymentStatusComponent } from "./layout/payment-status.component";
import { PaymentStatusRoutingModule } from "./payment-status-routing.module";

@NgModule({
	declarations: [PaymentStatusComponent],
	imports: [
		CommonModule,
		PaymentStatusRoutingModule,
		TypographyModule,
		IconModule,
		ImageModule,
		ButtonModule,
		I18nModule
	],
	providers: [getI18nProvider("paymentStatusPage", (lang) => import(`./i18n/${lang}.json`))]
})
export class PaymentStatusModule {}
