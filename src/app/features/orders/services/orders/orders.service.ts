import { Injectable } from "@angular/core";
import type { IStoreProductToOrder } from "@features/products";
import type { ConfirmProductToOrderInput, CreateOrderInput, UpdateOrderInput } from "@graphql";
import type { ManualPaymentEnum } from "@graphql";

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
	readonly activePlaceId$ = this._ordersRepository.activePlaceId$;
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

	setActivePlaceId(placeId?: string) {
		return this._ordersRepository.setActivePlaceId(placeId);
	}

	setActiveOrderId(orderId?: string) {
		return this._ordersRepository.setActiveOrderId(orderId);
	}

	setProductsToOrders(productsToOrders: IStoreProductToOrder[]) {
		this._ordersRepository.setProductsToOrders(productsToOrders);
	}

	addProductToOrder(productToOrder: Omit<IStoreProductToOrder, "id">) {
		this._ordersRepository.addProductToOrder(productToOrder);
	}

	updateProductToOrder(id: string, productToOrder: Omit<IStoreProductToOrder, "id">) {
		this._ordersRepository.updateProductToOrder(id, productToOrder);
	}

	removeProductFromOrder(id: string) {
		this._ordersRepository.removeProductToOrder(id);
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

	setManualPayForProductsInOrderGQL(productToOrderIds: string[], manualPaymentType: ManualPaymentEnum) {
		return this._setManualPayForProductsInOrderGQL.mutate({ productToOrderIds, manualPaymentType });
	}

	createPaymentOrderLink(productsToOrders: string[]) {
		return this._createPaymentOrderLinkGQL.mutate({ productsToOrders });
	}

	cancelOrder(orderId: string) {
		return this._cancelOrderGQL.mutate({ orderId });
	}
}
