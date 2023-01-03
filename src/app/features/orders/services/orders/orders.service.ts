import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";

import type { CreateOrderInput, UpdateOrderInput } from "../../../../../graphql";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CreateOrderGQL, OrderGQL, OrdersGQL, UpdateOrderGQL } from "../../graphql/orders";
import { OrdersRepository } from "../../repositories";

@Injectable({ providedIn: "root" })
export class OrdersService {
	readonly orders$ = this._ordersGQL
		.watch({ skip: 0, take: 5 })
		.valueChanges.pipe(map((result) => result.data.orders.data));

	readonly activeOrder$ = this._ordersRepository.activeOrder$;

	constructor(
		private readonly _ordersRepository: OrdersRepository,
		private readonly _ordersGQL: OrdersGQL,
		private readonly _orderGQL: OrderGQL,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _toastrService: ToastrService
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

	updateActiveOrder(func: (order: any) => any) {
		return this.activeOrder$.pipe(
			take(1),
			switchMap((activeOrder: any) => this.updateOrder(func(activeOrder)))
		);
	}

	getOrder(orderId: string) {
		return this._orderGQL.watch({ orderId }).valueChanges.pipe(map((result) => result.data.order));
	}
}
