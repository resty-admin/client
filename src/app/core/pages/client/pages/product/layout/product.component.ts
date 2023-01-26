import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FORM } from "@core/constants";
import { ActionsService } from "@features/app";
import { OrdersService } from "@features/orders";
import type { ProductEntity } from "@graphql";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CATEGORY_ID, CLIENT_ROUTES, PLACE_ID } from "@shared/constants";
import type { DeepAtLeast } from "@shared/interfaces";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import type { Observable } from "rxjs";
import { BehaviorSubject, map } from "rxjs";

import { PRODUCT_PAGE } from "../constants";
import { ProductPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit, OnDestroy {
	readonly productPage = PRODUCT_PAGE;
	readonly form = FORM;
	private readonly _productPageQuery = this._productsPageGQL.watch();
	readonly attributesFormControl = new FormControl<string[]>();
	readonly product$: Observable<any> = this._activatedRoute.data.pipe(map((data) => data["product"]));

	readonly countSubject = new BehaviorSubject(0);
	readonly count$ = this.countSubject.asObservable();

	data!: DeepAtLeast<ProductEntity, "id">;

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
					label: "Подтвердить",
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
