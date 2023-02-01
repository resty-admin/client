import { OrderTypeEnum } from "@graphql";
import { CLIENT_ROUTES } from "@shared/constants";

import type { IOrderType } from "../intefaces";

export const ORDER_TYPES: IOrderType[] = [
	{
		label: "in_place",
		type: OrderTypeEnum.InPlace,
		image: "in-place",
		routerLink: CLIENT_ROUTES.CONNECT_TO_TABLE.absolutePath,
		disabled: false
	},
	{
		label: "pickup",
		type: OrderTypeEnum.Pickup,
		image: "to-go",
		routerLink: CLIENT_ROUTES.REFERRAL_LINK.absolutePath,
		disabled: false
	},
	{
		label: "delivery",
		type: OrderTypeEnum.Delivery,
		image: "delivery",
		routerLink: CLIENT_ROUTES.REFERRAL_LINK.absolutePath,
		disabled: true
	},
	{
		label: "reserve",
		type: OrderTypeEnum.Reserve,
		image: "booking",
		routerLink: CLIENT_ROUTES.REFERRAL_LINK.absolutePath,
		disabled: false
	}
];
