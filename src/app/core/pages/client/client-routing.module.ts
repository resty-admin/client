import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { CLIENT_ROUTES as _SHARED_CLIENT_ROUTES } from "src/app/shared/routes";

import { ClientComponent } from "./layout/client.component";

export const CLIENT_ROUTES: Route[] = [
	{
		path: "",
		component: ClientComponent,
		children: [
			{
				..._SHARED_CLIENT_ROUTES.ORDERS,
				loadChildren: () => import("./pages/orders/orders.module").then((m) => m.OrdersModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.ORDER,
				loadChildren: () => import("./pages/order/order.module").then((m) => m.OrderModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.REFERRAL_LINK,
				loadChildren: () => import("./pages/referral-link/referral-link.module").then((m) => m.ReferralLinkModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.PRODUCTS_ERROR,
				loadChildren: () => import("./pages/products-error/products-error.module").then((m) => m.ProductsErrorModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.PAYMENT_TYPE,
				loadChildren: () => import("./pages/payment-type/payment-type.module").then((m) => m.PaymentTypeModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.PAYMENT_STATUS,
				loadChildren: () => import("./pages/payment-status/payment-status.module").then((m) => m.PaymentStatusModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.PLACES,
				loadChildren: () => import("./pages/places/places.module").then((m) => m.PlacesModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.PLACE,
				pathMatch: "full",
				redirectTo: _SHARED_CLIENT_ROUTES.DASHBOARD.absolutePath
			},
			{
				..._SHARED_CLIENT_ROUTES.DASHBOARD,
				loadChildren: () => import("./pages/dashboard/dashboard.module").then((m) => m.DashboardModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CODE,
				loadChildren: () => import("./pages/code/code.module").then((m) => m.CodeModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CATEGORIES,
				loadChildren: () => import("./pages/categories/categories.module").then((m) => m.CategoriesModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CATEGORY,
				pathMatch: "full",
				redirectTo: _SHARED_CLIENT_ROUTES.PRODUCTS.absolutePath
			},
			{
				..._SHARED_CLIENT_ROUTES.PRODUCTS,
				loadChildren: () => import("./pages/products/products.module").then((m) => m.ProductsModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.PRODUCT,
				loadChildren: () => import("./pages/product/product.module").then((m) => m.ProductModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.HALLS,
				loadChildren: () => import("./pages/halls/halls.module").then((m) => m.HallsModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.HALL,
				pathMatch: "full",
				redirectTo: _SHARED_CLIENT_ROUTES.TABLES.absolutePath
			},
			{
				..._SHARED_CLIENT_ROUTES.TABLES,
				loadChildren: () => import("./pages/tables/tables.module").then((m) => m.TablesModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.TABLE,
				loadChildren: () => import("./pages/table/table.module").then((m) => m.TableModule)
			},
			{
				path: "**",
				redirectTo: _SHARED_CLIENT_ROUTES.PLACES.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(CLIENT_ROUTES)],
	exports: [RouterModule]
})
export class ClientRoutingModule {}
