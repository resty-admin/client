import type { ProductEntity } from "@graphql";
import type { AttributesGroupEntity } from "@graphql";

export interface IProductInput {
	id: ProductEntity["id"];
	file?: ProductEntity["file"];
	name: ProductEntity["name"];
	description?: ProductEntity["description"];
	price: ProductEntity["price"];
	attrsGroups?:
		| {
				id: AttributesGroupEntity["id"];
				name: AttributesGroupEntity["name"];
				attributes?: AttributesGroupEntity["attributes"];
		  }[]
		| null;
	productsToOrders: {
		attributesIds: Record<string, string[] | string>;
		count: number;
	}[];
}
