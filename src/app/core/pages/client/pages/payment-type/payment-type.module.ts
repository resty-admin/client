import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { PAYMENT_TYPE_COMPONENTS } from "./components";
import { PaymentTypeComponent } from "./layout/payment-type.component";
import { PaymentTypeRoutingModule } from "./payment-type-routing.module";

@NgModule({
	declarations: [PaymentTypeComponent, ...PAYMENT_TYPE_COMPONENTS],
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
		PipesModule,
		SkeletonModule
	]
})
export class PaymentTypeModule {}
