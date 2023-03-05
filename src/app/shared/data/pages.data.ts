import { CLIENT_ROUTES } from "@shared/constants";

export const PAGES = [
	{
		label: "MY_ORDERS",
		icon: "orders",
		routerLink: CLIENT_ROUTES.ACTIVE_ORDERS.absolutePath
	},
	{
		label: "PLACES",
		icon: "places",
		routerLink: CLIENT_ROUTES.PLACES.absolutePath
	}
];
