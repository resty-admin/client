import { Injectable } from "@angular/core";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { persistState } from "@ngneat/elf-persist-state";
import { includeKeys } from "elf-sync-state";
import { LocalforageService } from "src/app/shared/modules/localforage";

import type { ActiveOrderEntity } from "../../../../../graphql";

export interface IOrdersState {
	activeOrder?: ActiveOrderEntity | null;
}

@Injectable({ providedIn: "root" })
export class OrdersRepository {
	private readonly _store = createStore({ name: "orders" }, withProps<IOrdersState>({ activeOrder: null }));

	readonly persist = persistState(this._store, {
		storage: LocalforageService.storage,
		source: () => this._store.pipe(includeKeys(["activeOrder"]))
	});

	readonly store$ = this._store.pipe(select((store) => store));

	readonly activeOrder$ = this.store$.pipe(select((state) => state.activeOrder));

	get activeOrder() {
		return this._store.getValue().activeOrder;
	}

	updateActiveOrder(activeOrder?: any) {
		return this._store.update(setProp("activeOrder", activeOrder));
	}
}
