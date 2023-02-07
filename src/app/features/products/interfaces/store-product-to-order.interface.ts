export interface IStoreProductToOrder {
	id: string;
	productId: string;
	attributesIds: Record<string, string[] | string>;
	count: number;
	placeId: string;
}
