import { Injectable } from "@angular/core";
import type { IStoreProductToOrder } from "@features/products";
import type { IProductOutput } from "@features/products";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { persistState } from "@ngneat/elf-persist-state";
import { LocalforageService } from "@shared/modules/localforage";
import { includeKeys } from "elf-sync-state";

export interface IOrdersState {
	activeOrderId?: string;
	activePlaceId?: string;
	productsToOrders: IStoreProductToOrder[];
}

@Injectable({ providedIn: "root" })
export class OrdersRepository {
	private readonly _store = createStore({ name: "orders" }, withProps<IOrdersState>({ productsToOrders: [] }));

	constructor() {
		persistState(this._store, {
			storage: LocalforageService.storage,
			source: () => this._store.pipe(includeKeys(["activeOrderId", "activePlaceId", "productsToOrders"]))
		});
	}

	readonly store$ = this._store.pipe(select((store) => store));

	readonly activeOrderId$ = this.store$.pipe(select((state) => state.activeOrderId));
	readonly activePlaceId$ = this.store$.pipe(select((state) => state.activePlaceId));
	readonly productsToOrders$ = this.store$.pipe(select((state) => state.productsToOrders));

	setActivePlaceId(activePlaceId?: string) {
		return this._store.update(setProp("activePlaceId", activePlaceId));
	}

	setActiveOrderId(activeOrderId?: string) {
		return this._store.update(setProp("activeOrderId", activeOrderId));
	}

	setProductsToOrders(productsToOrders: IStoreProductToOrder[]) {
		this._store.update(setProp("productsToOrders", productsToOrders));
	}

	addProductToOrder(productOutput: IStoreProductToOrder) {
		const { productsToOrders } = this._store.getValue();

		const findedProductToOrder = productsToOrders.find(
			(productToOrder) => productToOrder.productId === productOutput.productId
		);

		this._store.update(
			setProp("productsToOrders", [
				...productsToOrders.filter((productToOrder) => productToOrder !== findedProductToOrder),
				{
					...(findedProductToOrder || productOutput),
					count: (findedProductToOrder?.count || 0) + (productOutput?.count || 1)
				}
			])
		);
	}

	removeProductToOrder({ productId }: IProductOutput) {
		const { productsToOrders } = this._store.getValue();

		const productToRemove = productsToOrders.find((productToOrder) => productToOrder.productId === productId);

		if ((productToRemove?.count || 0) > 1) {
			this._store.update(
				setProp(
					"productsToOrders",
					productsToOrders.map((storeProductToOrder) => ({
						...storeProductToOrder,
						count: storeProductToOrder === productToRemove ? storeProductToOrder.count - 1 : storeProductToOrder.count
					}))
				)
			);
		} else {
			this._store.update(
				setProp(
					"productsToOrders",
					productsToOrders.filter((storeProductToOrder) => storeProductToOrder !== productToRemove)
				)
			);
		}
	}
}
