import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { TypographyModule } from "src/app/shared/ui/typography";

import { PaymentTypeComponent } from "./layout/payment-type.component";
import { PaymentTypeRoutingModule } from "./payment-type-routing.module";

@NgModule({
	declarations: [PaymentTypeComponent],
	imports: [CommonModule, PaymentTypeRoutingModule, TypographyModule, RadioButtonModule, ImageModule, IconModule],
	exports: [PaymentTypeComponent]
})
export class PaymentTypeModule {}
