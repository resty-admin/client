import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { PaymentTypeComponent } from "./layout/payment-type.component";

export const PAYMENT_TYPE_ROUTES: Route[] = [
	{
		path: "",
		component: PaymentTypeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PAYMENT_TYPE_ROUTES)],
	exports: [RouterModule]
})
export class PaymentTypeRoutingModule {}
