import { OrderTypeEnum } from "../../../../../../../graphql";
import { CLIENT_ROUTES } from "../../../../../../shared/routes";

export const ORDER_TYPES = [
	{
		label: "IN_PLACE",
		type: OrderTypeEnum.InPlace,
		link: CLIENT_ROUTES.CODE.absolutePath,
		image: "in-place"
	},
	{
		label: "PICKUP",
		type: OrderTypeEnum.Pickup,
		link: CLIENT_ROUTES.CATEGORIES.absolutePath,
		image: "to-go"
	},
	{
		label: "DELIVERY",
		type: OrderTypeEnum.Delivery,
		link: CLIENT_ROUTES.CATEGORIES.absolutePath,
		image: "delivery"
	},
	{
		label: "RESERVE",
		type: OrderTypeEnum.Reserve,
		link: CLIENT_ROUTES.HALLS.absolutePath,
		image: "booking"
	}
];
