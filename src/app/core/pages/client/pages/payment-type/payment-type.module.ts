import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../shared/modules/i18n";
import { PipesModule } from "../../../../../shared/modules/pipes";
import { ButtonModule } from "../../../../../shared/ui/button";
import { PaymentTypeComponent } from "./layout/payment-type.component";
import { PaymentTypeRoutingModule } from "./payment-type-routing.module";
import { PAYMENT_TYPE_PROVIDERS } from "./providers";

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
		I18nModule,
		PipesModule
	],
	providers: PAYMENT_TYPE_PROVIDERS
})
export class PaymentTypeModule {}
