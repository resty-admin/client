import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PaymentTypeSkeletonComponent } from "./components";
import { PAYMENT_TYPE_PAGE } from "./constants";
import { PaymentTypeComponent } from "./layout/payment-type.component";
import { PaymentTypeResolver } from "./resolvers";

export const PAYMENT_TYPE_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PaymentTypeComponent,
		data: {
			animation: PAYMENT_TYPE_PAGE
		},
		resolve: {
			order: PaymentTypeResolver
		},
		skeleton: {
			component: PaymentTypeSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PAYMENT_TYPE_ROUTES)],
	exports: [RouterModule]
})
export class PaymentTypeRoutingModule {}
