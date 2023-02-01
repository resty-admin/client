import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PaymentTypePageSkeletonComponent } from "./components";
import { PaymentTypeComponent } from "./layout/payment-type.component";
import { PaymentTypePageResolver } from "./resolvers";

export const PAYMENT_TYPE_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PaymentTypeComponent,
		data: {
			animation: "paymentTypePage"
		},
		resolve: {
			order: PaymentTypePageResolver
		},
		skeleton: {
			component: PaymentTypePageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PAYMENT_TYPE_ROUTES)],
	exports: [RouterModule]
})
export class PaymentTypeRoutingModule {}
