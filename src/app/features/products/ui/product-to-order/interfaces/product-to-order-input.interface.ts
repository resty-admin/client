import type { AttributesEntity, ProductEntity, ProductToOrderEntity, Scalars, UserEntity } from "@graphql";

export interface IProductToOrderInput {
	id: ProductToOrderEntity["id"];
	paidStatus: ProductToOrderEntity["paidStatus"];
	user: {
		name: UserEntity["name"];
	};
	count: ProductToOrderEntity["count"];
	product: {
		name: ProductEntity["name"];
		description: ProductEntity["description"];
		price: ProductEntity["price"];
		file?: ProductEntity["file"];
	};
	attributesToProduct?: {
		attribute: AttributesEntity;
		count: Scalars["Int"];
		id: Scalars["String"];
	}[];
}
