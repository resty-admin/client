import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { PaymentStatusComponent } from "./layout/payment-status.component";

export const PAYMENT_STATUS_ROUTES: Route[] = [
	{
		path: "",
		component: PaymentStatusComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PAYMENT_STATUS_ROUTES)],
	exports: [RouterModule]
})
export class PaymentStatusRoutingModule {}
