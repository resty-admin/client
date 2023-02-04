import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PaymentStatusPageSkeletonComponent } from "./components";
import { PaymentStatusComponent } from "./layout/payment-status.component";
import { PaymentStatusPageResolver } from "./resolvers";

export const PAYMENT_STATUS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PaymentStatusComponent,
		data: {
			animation: "paymentStatusPage"
		},
		resolve: {
			order: PaymentStatusPageResolver
		},
		skeleton: {
			component: PaymentStatusPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PAYMENT_STATUS_ROUTES)],
	exports: [RouterModule]
})
export class PaymentStatusRoutingModule {}
