import type { OrderTypeEnum } from "../../../../../../../graphql";

export interface IOrderType {
	label: string;
	type: OrderTypeEnum;
	image: string;
	routerLink: string;
}
