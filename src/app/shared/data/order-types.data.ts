import { OrderTypeEnum } from "@graphql";
import { CLIENT_ROUTES } from "@shared/constants";

import type { IOrderType } from "../interfaces/order";

export const ORDER_TYPES: IOrderType[] = [
	{
		label: "IN_PLACE",
		type: OrderTypeEnum.InPlace,
		image: "in-place",
		routerLink: CLIENT_ROUTES.CONNECT_TO_TABLE.absolutePath,
		disabled: false,
		a11y: "order"
	},
	{
		label: "PICKUP",
		type: OrderTypeEnum.Pickup,
		image: "to-go",
		routerLink: CLIENT_ROUTES.REFERRAL_LINK.absolutePath,
		disabled: false,
		a11y: "takeaway"
	},
	{
		label: "DELIVERY",
		type: OrderTypeEnum.Delivery,
		image: "delivery",
		routerLink: CLIENT_ROUTES.REFERRAL_LINK.absolutePath,
		disabled: false,
		a11y: "delivery"
	},
	{
		label: "RESERVE",
		type: OrderTypeEnum.Reserve,
		image: "booking",
		routerLink: CLIENT_ROUTES.REFERRAL_LINK.absolutePath,
		disabled: false,
		a11y: "booking"
	}
];
