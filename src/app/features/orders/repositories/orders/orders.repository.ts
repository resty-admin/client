import { Injectable } from "@angular/core";
import type { IStoreProductToOrder } from "@features/products";
import type { IProductOutput } from "@features/products";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { persistState } from "@ngneat/elf-persist-state";
import { LocalforageService } from "@shared/modules/localforage";
import { includeKeys } from "elf-sync-state";

export interface IOrdersState {
	activeOrderId?: string;
	tableId?: string;
	productsToOrders: IStoreProductToOrder[];
}

@Injectable({ providedIn: "root" })
export class OrdersRepository {
	private readonly _store = createStore(
		{ name: "orders" },
		withProps<IOrdersState>({ activeOrderId: undefined, productsToOrders: [], tableId: undefined })
	);

	private readonly _persist = persistState(this._store, {
		storage: LocalforageService.storage,
		source: () => this._store.pipe(includeKeys(["activeOrderId", "productsToOrders"]))
	});

	readonly store$ = this._store.pipe(select((store) => store));

	readonly activeOrderId$ = this.store$.pipe(select((state) => state.activeOrderId));
	readonly tableId$ = this.store$.pipe(select((state) => state.tableId));
	readonly productsToOrders$ = this.store$.pipe(select((state) => state.productsToOrders));

	setActiveOrderId(activeOrderId?: string) {
		return this._store.update(setProp("activeOrderId", activeOrderId));
	}

	setTableId(tableId?: string) {
		return this._store.update(setProp("tableId", tableId));
	}

	setProductsToOrders(productsToOrders: IStoreProductToOrder[]) {
		this._store.update(setProp("productsToOrders", productsToOrders));
	}

	addProductToOrder(productOutput: IProductOutput) {
		const { productsToOrders } = this._store.getValue();

		const findedProductToOrder = productsToOrders.find(
			(productToOrder) => productToOrder.productId === productOutput.productId
		);

		this._store.update(
			setProp("productsToOrders", [
				...productsToOrders.filter((productToOrder) => productToOrder !== findedProductToOrder),
				{
					...(findedProductToOrder || productOutput),
					count: (findedProductToOrder?.count || 0) + 1
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
