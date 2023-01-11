import { Injectable } from "@angular/core";
import { map, of, switchMap, take, tap } from "rxjs";

import type { CreateOrderInput, UpdateOrderInput } from "../../../../../graphql";
import { ToastrService } from "../../../../shared/ui/toastr";
import { AddUserToOrderGQL, CreateOrderGQL, OrderGQL, OrdersGQL, UpdateOrderGQL } from "../../graphql/orders";
import { OrdersRepository } from "../../repositories";

@Injectable({ providedIn: "root" })
export class OrdersService {
	private readonly _ordersQuery = this._ordersGQL.watch({ skip: 0, take: 5 });

	readonly orders$ = this._ordersQuery.valueChanges.pipe(map((result) => result.data.orders.data));

	readonly activeOrder$ = this._ordersRepository.activeOrder$;

	constructor(
		private readonly _toastrService: ToastrService,
		private readonly _ordersRepository: OrdersRepository,
		private readonly _ordersGQL: OrdersGQL,
		private readonly _orderGQL: OrderGQL,
		private readonly _createOrderGQL: CreateOrderGQL,
		private readonly _updateOrderGQL: UpdateOrderGQL,
		private readonly _addUserToOrderGQL: AddUserToOrderGQL
	) {}

	setActiveOrder(order: any) {
		this._ordersRepository.updateActiveOrder(order);
	}

	createOrder(order: CreateOrderInput) {
		return this._createOrderGQL.mutate({ order }).pipe(
			take(1),
			this._toastrService.observe("Заказ"),
			tap(async () => {
				await this._ordersQuery.refetch();
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
				await this._ordersQuery.refetch();
			})
		);
	}

	addProductToOrder(product: any) {
		console.log(product);
		return this.activeOrder$.pipe(take(1), take(1));
	}

	removeUserProductInOrder(userToOrderId: string) {
		console.log(userToOrderId);
		return of(null).pipe(take(1)) as any;
	}

	updateUserProductInOrder(userToOrder: any) {
		console.log(userToOrder);
		return of(null).pipe(take(1)) as any;
	}

	addUserToOrder(code: number) {
		return this._addUserToOrderGQL.mutate({ code }).pipe(
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
