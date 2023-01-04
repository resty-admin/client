import { CLIENT_ROUTES } from "../../../../shared/routes";

export const PAGES = [
	{
		label: "MY_ORDERS",
		icon: "layers",
		routerLink: CLIENT_ROUTES.ORDERS.absolutePath
	},
	{
		label: "PLACES",
		icon: "places",
		routerLink: CLIENT_ROUTES.PLACES.absolutePath
	},
	{
		label: "CALL_WAITER",
		icon: "waiter",
		routerLink: CLIENT_ROUTES.PLACES.absolutePath
	},
	{
		label: "CALL_HOOKAH",
		icon: "hookah",
		routerLink: CLIENT_ROUTES.PLACES.absolutePath
	}
];
