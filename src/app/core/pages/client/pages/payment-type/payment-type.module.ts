import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../../shared/ui/button";
import { PAYMENT_TYPE_PAGE_I18N } from "./constants";
import { PaymentTypeComponent } from "./layout/payment-type.component";
import { PaymentTypeRoutingModule } from "./payment-type-routing.module";

@NgModule({
	declarations: [PaymentTypeComponent],
	imports: [
		CommonModule,
		PaymentTypeRoutingModule,
		TypographyModule,
		RadioButtonModule,
		ImageModule,
		IconModule,
		ButtonModule,
		ReactiveFormsModule,
		I18nModule
	],
	providers: [getI18nProvider(PAYMENT_TYPE_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class PaymentTypeModule {}
