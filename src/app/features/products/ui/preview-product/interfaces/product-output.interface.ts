export interface IProductOutput {
	productId: string;
	attributesIds: Record<string, string[] | string>;
	count: number;
}
