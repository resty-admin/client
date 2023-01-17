import { Injectable } from "@angular/core";

import type {
	AddProductToOrderInput,
	CreateOrderInput,
	RemoveProductFromOrderInput,
	UpdateOrderInput
} from "../../../../../graphql";
import {
	AddProductToOrderGQL,
	AddTableToOrderGQL,
	AddUserToOrderGQL,
	CloseOrderGQL,
	ConfirmOrderGQL,
	CreateOrderGQL,
	DeleteOrderGQL,
	RemoveProductFromOrderGQL,
	RemoveTableFromOrderGQL,
	SetManualPayForProductsInOrderGQL,
	UpdateOrderGQL
} from "../../graphql/orders";
import { OrdersRepository } from "../../repositories";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly activeOrderId$ = this._ordersRepository.activeOrderId$;

	constructor(
		private readonly _ordersRepository: OrdersRepository,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _deleteOrderGQL: DeleteOrderGQL,
		private readonly _closeOrderGQL: CloseOrderGQL,
		private readonly _addUserToOrderGQL: AddUserToOrderGQL,
		private readonly _addTableToOrderGQL: AddTableToOrderGQL,
		private readonly _removeTableFromOrdeGQL: RemoveTableFromOrderGQL,
		private readonly _addProductToOrderGQL: AddProductToOrderGQL,
		private readonly _removeProductFromOrderGQL: RemoveProductFromOrderGQL,
		private readonly _confirmOrderGQL: ConfirmOrderGQL,
		private readonly _setManualPayForProductsInOrderGQL: SetManualPayForProductsInOrderGQL
	) {}

	setActiveOrderId(orderId?: string) {
		return this._ordersRepository.setActiveOrderId(orderId);
	}

	createOrder(order: CreateOrderInput) {
		return this._createOrderGQL.mutate({ order });
	}

	updateOrder(order: UpdateOrderInput) {
		return this._updateOrderGQL.mutate({ order });
	}

	deleteOrder(orderId: string) {
		return this._deleteOrderGQL.mutate({ orderId });
	}

	closeOrder(orderId: string) {
		return this._closeOrderGQL.mutate({ orderId });
	}

	addUserToOrder(code: number) {
		return this._addUserToOrderGQL.mutate({ code });
	}

	addTableToOrder(orderId: string, tableId: string) {
		return this._addTableToOrderGQL.mutate({ orderId, tableId });
	}

	removeTableFromOrder(orderId: string) {
		return this._removeTableFromOrdeGQL.mutate({ orderId });
	}

	addProductToOrder(productToOrder: AddProductToOrderInput) {
		return this._addProductToOrderGQL.mutate({ productToOrder });
	}

	removeProductFromOrder(productFromOrder: RemoveProductFromOrderInput) {
		return this._removeProductFromOrderGQL.mutate({ productFromOrder });
	}

	confirmOrder(orderId: string) {
		return this._confirmOrderGQL.mutate({ orderId });
	}

	setManualPayForProductsInOrderGQL(productToOrderIds: string[]) {
		return this._setManualPayForProductsInOrderGQL.mutate({ productToOrderIds });
	}
}
