import type { ProductEntity } from "@graphql";

export interface IProductInput {
	id: ProductEntity["id"];
	file?: ProductEntity["file"];
	name: ProductEntity["name"];
	description?: ProductEntity["description"];
	price: ProductEntity["price"];
	attrsGroups: ProductEntity["attrsGroups"];
	productsToOrders: {
		attributesIds: string[];
		count: number;
	}[];
}
