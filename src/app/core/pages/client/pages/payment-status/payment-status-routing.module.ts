import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PaymentStatusSkeletonComponent } from "./components";
import { PAYMENT_STATUS_PAGE } from "./constants";
import { PaymentStatusComponent } from "./layout/payment-status.component";
import { PaymentStatusResolver } from "./resolvers";

export const PAYMENT_STATUS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PaymentStatusComponent,
		data: {
			animation: PAYMENT_STATUS_PAGE
		},
		resolve: {
			order: PaymentStatusResolver
		},
		skeleton: {
			component: PaymentStatusSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PAYMENT_STATUS_ROUTES)],
	exports: [RouterModule]
})
export class PaymentStatusRoutingModule {}
