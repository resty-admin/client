import { CLIENT_ROUTES } from "../../../../shared/constants";

export const PAGES = [
	{
		label: "MY_ORDERS",
		icon: "layers",
		routerLink: CLIENT_ROUTES.ALL_ORDERS.absolutePath
	},
	{
		label: "PLACES",
		icon: "places",
		routerLink: CLIENT_ROUTES.PLACES.absolutePath
	},
	{
		label: "CALL_WAITER",
		icon: "waiter",
		routerLink: "call-waiter"
	},
	{
		label: "CALL_HOOKAH",
		icon: "hookah",
		routerLink: "call-hookah"
	}
];
