import type { ProductEntity } from "@graphql";

export interface IPreviewProduct {
	id: ProductEntity["id"];
	file?: ProductEntity["file"];
	name: ProductEntity["name"];
	description?: ProductEntity["description"];
	price: ProductEntity["price"];
}
