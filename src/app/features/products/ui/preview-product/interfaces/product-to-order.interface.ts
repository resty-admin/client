import type { AttributesEntity, ProductEntity, ProductToOrderEntity } from "../../../../../../graphql";

export interface IProductToOrder {
	id: ProductToOrderEntity["id"];
	count: ProductToOrderEntity["count"];
	product: {
		id: ProductEntity["id"];
		name: ProductEntity["name"];
		price: ProductEntity["price"];
	};
	attributes?: {
		id: AttributesEntity["id"];
		name: AttributesEntity["name"];
		price: AttributesEntity["price"];
	}[];
}
