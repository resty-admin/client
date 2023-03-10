import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { CLIENT_ROUTES as _SHARED_CLIENT_ROUTES } from "@shared/constants";

import { ClientComponent } from "./layout/client.component";

export const CLIENT_ROUTES: Route[] = [
	{
		path: "",
		component: ClientComponent,
		data: {
			animation: "clientPage"
		},
		children: [
			{
				..._SHARED_CLIENT_ROUTES.PROFILE,
				loadChildren: () => import("./pages/profile/profile.module").then((m) => m.ProfileModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.ACTIVE_ORDERS,
				loadChildren: () => import("./pages/active-orders/active-orders.module").then((m) => m.ActiveOrdersModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.ACTIVE_ORDER,
				loadChildren: () => import("./pages/active-order/active-order.module").then((m) => m.ActiveOrderModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.HISTORY_ORDERS,
				loadChildren: () => import("./pages/history-orders/history-orders.module").then((m) => m.HistoryOrdersModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.HISTORY_ORDER,
				loadChildren: () => import("./pages/history-order/history-order.module").then((m) => m.HistoryOrderModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CONFIRM_PRODUCTS,
				loadChildren: () =>
					import("./pages/confirm-products/confirm-products.module").then((m) => m.ConfirmProductsModule)
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
				redirectTo: _SHARED_CLIENT_ROUTES.CREATE_ORDER.absolutePath
			},
			{
				..._SHARED_CLIENT_ROUTES.CREATE_ORDER,
				loadChildren: () => import("./pages/create-order/create-order.module").then((m) => m.CreateOrderModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CONNECT_TO_TABLE,
				loadChildren: () =>
					import("./pages/connect-to-table/connect-to-table.module").then((m) => m.ConnectToTableModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CONNECT_TO_ORDER,
				loadChildren: () =>
					import("./pages/connect-to-order/connect-to-order.module").then((m) => m.ConnectToOrderModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CATEGORIES,
				loadChildren: () => import("./pages/categories/categories.module").then((m) => m.CategoriesModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.PRODUCTS,
				loadChildren: () => import("./pages/products/products.module").then((m) => m.ProductsModule)
			},
			{
				..._SHARED_CLIENT_ROUTES.CATEGORY,
				redirectTo: _SHARED_CLIENT_ROUTES.PRODUCTS.path
			},
			{
				..._SHARED_CLIENT_ROUTES.HALLS,
				loadChildren: () => import("./pages/halls/halls.module").then((m) => m.HallsModule)
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
				..._SHARED_CLIENT_ROUTES.HALL,
				redirectTo: _SHARED_CLIENT_ROUTES.TABLES.path
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
