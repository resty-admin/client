import { OrderTypeEnum } from "../../../../../../../graphql";

export const ORDER_TYPES = [
	{
		label: "IN_PLACE",
		type: OrderTypeEnum.InPlace,
		image: "in-place"
	},
	{
		label: "PICKUP",
		type: OrderTypeEnum.Pickup,
		image: "to-go"
	},
	{
		label: "DELIVERY",
		type: OrderTypeEnum.Delivery,
		image: "delivery"
	},
	{
		label: "RESERVE",
		type: OrderTypeEnum.Reserve,
		image: "booking"
	}
];
