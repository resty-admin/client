import { Injectable } from "@angular/core";
import type { IStoreProductToOrder } from "@features/products";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { persistState } from "@ngneat/elf-persist-state";
import { LocalforageService } from "@shared/modules/localforage";
import { includeKeys } from "elf-sync-state";
import { isEqual } from "lodash";
import { v4 } from "uuid";

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

	addProductToOrder(productOutput: Omit<IStoreProductToOrder, "id">) {
		const { productsToOrders } = this._store.getValue();

		const findedProductToOrder = productsToOrders.find(
			(productToOrder) =>
				productToOrder.productId === productOutput.productId &&
				isEqual(productToOrder.attributesIds, productOutput.attributesIds)
		);

		this._store.update(
			setProp(
				"productsToOrders",
				findedProductToOrder
					? productsToOrders.map((productToOrder) =>
							productToOrder.id === findedProductToOrder.id
								? {
										...productToOrder,
										count: productToOrder.count + productOutput.count
								  }
								: productToOrder
					  )
					: [...productsToOrders, { id: v4(), ...productOutput, count: productOutput?.count || 1 }]
			)
		);
	}

	updateProductToOrder(id: string, productOutput: Omit<IStoreProductToOrder, "id">) {
		this._store.update(
			setProp(
				"productsToOrders",
				this._store
					.getValue()
					.productsToOrders.map((storeProductToOrder) => ({
						...storeProductToOrder,
						...(storeProductToOrder.id === id ? productOutput : {})
					}))
					.filter((storeProductToOrder) => storeProductToOrder.count)
			)
		);
	}

	removeProductToOrder(id: string) {
		this._store.update(
			setProp(
				"productsToOrders",
				this._store
					.getValue()
					.productsToOrders.map((storeProductToOrder) => ({
						...storeProductToOrder,
						count: storeProductToOrder.id === id ? storeProductToOrder.count - 1 : storeProductToOrder.count
					}))
					.filter((storeProductToOrder) => storeProductToOrder.count)
			)
		);
	}
}
