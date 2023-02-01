import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PaymentStatusPageSkeletonComponent } from "./components";
import { PAYMENT_STATUS_PAGE } from "./constants";
import { PaymentStatusComponent } from "./layout/payment-status.component";
import { PaymentStatusPageResolver } from "./resolvers";

export const PAYMENT_STATUS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PaymentStatusComponent,
		data: {
			animation: PAYMENT_STATUS_PAGE
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
