import { OrderTypeEnum } from "../../../../../../../graphql";

export const ORDER_TYPES = [
	{
		label: "in_place",
		type: OrderTypeEnum.InPlace,
		image: "in-place"
	},
	{
		label: "pickup",
		type: OrderTypeEnum.Pickup,
		image: "to-go"
	},
	{
		label: "delivery",
		type: OrderTypeEnum.Delivery,
		image: "delivery"
	},
	{
		label: "reserve",
		type: OrderTypeEnum.Reserve,
		image: "booking"
	}
];
