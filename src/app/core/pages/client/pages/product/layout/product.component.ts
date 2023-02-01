import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CATEGORY_ID, CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { BehaviorSubject } from "rxjs";

import type { ProductPageQuery } from "../graphql";
import { ProductPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
	private readonly _productPageQuery = this._productsPageGQL.watch();
	readonly attributesFormControl = new FormControl<string[]>();
	readonly countSubject = new BehaviorSubject(0);
	readonly count$ = this.countSubject.asObservable();

	product: ProductPageQuery["product"] | null = null;

	constructor(
		readonly sharedService: SharedService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _routerService: RouterService,
		private readonly _productsPageGQL: ProductPageGQL,
		private readonly _ordersService: OrdersService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	async ngOnInit() {
		this.product = this._activatedRoute.snapshot.data["product"];

		const { placeId, categoryId, productId } = this._routerService.getParams();

		if (!productId) {
			return;
		}

		await this._productPageQuery.setVariables({ productId });

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.PRODUCTS.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categoryId)
		});

		this.countSubject
			.asObservable()
			.pipe(untilDestroyed(this))
			.subscribe((count) => {
				this._actionsService.setAction({
					label: "CONFIRM",
					disabled: !count,
					func: async () => {
						await this._ordersService.addProductToOrder({
							productId,
							attributesIds: this.attributesFormControl.value,
							count: this.countSubject.getValue(),
							placeId: this._routerService.getParams(PLACE_ID.slice(1)) || ""
						});

						await this._routerService.navigateByUrl(
							CLIENT_ROUTES.PRODUCTS.absolutePath.replace(PLACE_ID, placeId).replace(CATEGORY_ID, categoryId)
						);
					}
				});
			});
	}

	removeProductFromOrder() {
		this.countSubject.next(this.countSubject.value - 1);
	}

	addProductToOrder() {
		this.countSubject.next(this.countSubject.value + 1);
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
