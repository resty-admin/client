import { CLIENT_ROUTES } from "@shared/constants";

export const PAGES = [
	{
		label: "my_orders",
		icon: "layers",
		routerLink: CLIENT_ROUTES.ACTIVE_ORDERS.absolutePath
	},
	{
		label: "places",
		icon: "places",
		routerLink: CLIENT_ROUTES.PLACES.absolutePath
	},
	{
		label: "call_waiter",
		icon: "waiter",
		routerLink: "call-waiter"
	},
	{
		label: "call_hookah",
		icon: "hookah",
		routerLink: "call-hookah"
	}
];
