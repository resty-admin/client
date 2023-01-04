import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";

import type { CreateOrderInput, UpdateOrderInput } from "../../../../../graphql";
import { ToastrService } from "../../../../shared/ui/toastr";
import {
	AddProductToOrderGQL,
	AddUserToOrderGQL,
	CreateOrderGQL,
	OrderGQL,
	OrdersGQL,
	UpdateOrderGQL
} from "../../graphql/orders";
import { OrdersRepository } from "../../repositories";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly orders$ = this._ordersGQL
		.watch({ skip: 0, take: 5 })
		.valueChanges.pipe(map((result) => result.data.orders.data));

	readonly activeOrder$ = this._ordersRepository.activeOrder$;

	constructor(
		private readonly _toastrService: ToastrService,
		private readonly _ordersRepository: OrdersRepository,
		private readonly _ordersGQL: OrdersGQL,
		private readonly _orderGQL: OrderGQL,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _addProductToOrderGQL: AddProductToOrderGQL,
		private readonly _addUserToOrderGQL: AddUserToOrderGQL
	) {}

	setActiveOrder(order: any) {
		this._ordersRepository.updateActiveOrder(order);
	}

	async refetch() {
		await this._ordersGQL.watch({ skip: 0, take: 5 }).refetch();
	}

	createOrder(order: CreateOrderInput) {
		return this._createOrderGQL.mutate({ order }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			}),
			map((result) => result.data?.createOrder),
			tap((order) => {
				this._ordersRepository.updateActiveOrder(order);
			})
		);
	}

	updateOrder(order: UpdateOrderInput) {
		return this._updateOrderGQL.mutate({ order }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	addProductToOrder(product: any) {
		return this.activeOrder$.pipe(
			take(1),
			switchMap((order: any) => this._addProductToOrderGQL.mutate({ orderId: order.id, product })),
			take(1)
		);
	}

	addUserToOrder(placeId: string, code: number) {
		return this._addUserToOrderGQL.mutate({ placeId, code }).pipe(
			take(1),
			map((result) => result.data?.addUserToOrder)
		);
	}

	updateActiveOrder(order: any) {
		return this.activeOrder$.pipe(
			take(1),
			switchMap(({ id }: any) => this.updateOrder({ id, ...order }))
		);
	}

	getOrder(orderId: string) {
		return this._orderGQL.watch({ orderId }).valueChanges.pipe(map((result) => result.data.order));
	}
}
