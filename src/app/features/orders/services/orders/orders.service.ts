import { Injectable } from "@angular/core";
import type { IStoreProductToOrder } from "@features/products";
import type { IProductOutput } from "@features/products";
import type { ConfirmProductToOrderInput, CreateOrderInput, UpdateOrderInput } from "@graphql";

import {
	AddTableToOrderGQL,
	AddUserToOrderGQL,
	CancelOrderGQL,
	CloseOrderGQL,
	ConfirmProductsToOrdersGQL,
	CreateOrderGQL,
	CreatePaymentOrderLinkGQL,
	DeleteOrderGQL,
	RemoveTableFromOrderGQL,
	SetManualPayForProductsInOrderGQL,
	UpdateOrderGQL
} from "../../graphql";
import { OrdersRepository } from "../../repositories";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly activeOrderId$ = this._ordersRepository.activeOrderId$;
	readonly productsToOrders$ = this._ordersRepository.productsToOrders$;

	constructor(
		private readonly _ordersRepository: OrdersRepository,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _deleteOrderGQL: DeleteOrderGQL,
		private readonly _closeOrderGQL: CloseOrderGQL,
		private readonly _addUserToOrderGQL: AddUserToOrderGQL,
		private readonly _addTableToOrderGQL: AddTableToOrderGQL,
		private readonly _removeTableFromOrdeGQL: RemoveTableFromOrderGQL,
		private readonly _confirmProductsToOrders: ConfirmProductsToOrdersGQL,
		private readonly _setManualPayForProductsInOrderGQL: SetManualPayForProductsInOrderGQL,
		private readonly _createPaymentOrderLinkGQL: CreatePaymentOrderLinkGQL,
		private readonly _cancelOrderGQL: CancelOrderGQL
	) {}

	setActiveOrderId(orderId?: string) {
		return this._ordersRepository.setActiveOrderId(orderId);
	}

	setProductsToOrders(productsToOrders: IStoreProductToOrder[]) {
		this._ordersRepository.setProductsToOrders(productsToOrders);
	}

	addProductToOrder(productToOrder: IProductOutput) {
		this._ordersRepository.addProductToOrder(productToOrder);
	}

	removeProductFromOrder(productToOrder: IProductOutput) {
		this._ordersRepository.removeProductToOrder(productToOrder);
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

	confirmProductsToOrders(productsToOrders: ConfirmProductToOrderInput[]) {
		return this._confirmProductsToOrders.mutate({ productsToOrders });
	}

	setManualPayForProductsInOrderGQL(productToOrderIds: string[]) {
		return this._setManualPayForProductsInOrderGQL.mutate({ productToOrderIds });
	}

	createPaymentOrderLink(productsToOrders: string[]) {
		return this._createPaymentOrderLinkGQL.mutate({ productsToOrders });
	}

	cancelOrder(orderId: string) {
		return this._cancelOrderGQL.mutate({ orderId });
	}
}
