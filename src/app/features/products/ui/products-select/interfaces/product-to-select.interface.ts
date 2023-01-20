import type { IPreviewProduct, IProductToOrder } from "../../preview-product/interfaces";

export type IProductToSelect = IPreviewProduct & { productsToOrders: IProductToOrder[] };
