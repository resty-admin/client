import type { IProductToOrder } from "./product-to-order.interface";

export interface IProductToOrderWithAttributes extends IProductToOrder {
	attributesName: string;
}
