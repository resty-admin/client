import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { map } from "rxjs";

import { CATEGORIES_PAGE_I18N } from "../constants";
import { CategoriesPageGQL } from "../graphql";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
	readonly categoriesPageI18n = CATEGORIES_PAGE_I18N;
	private readonly _categoriesPageQuery = this._categoriesPageGQL.watch();
	readonly categories$: any = this._activatedRoute.data.pipe(map((data) => data["categories"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _categoriesPageGQL: CategoriesPageGQL,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(PLACE_ID, placeId)
		});

		await this._categoriesPageQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
	}

	trackByFn(index: number) {
		return index;
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
