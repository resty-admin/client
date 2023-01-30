import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PLACE_ID } from "@shared/constants";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { CATEGORIES_PAGE } from "../constants";
import { CategoriesPageService } from "../services";

@Component({
	selector: "app-categories",
	templateUrl: "./categories.component.html",
	styleUrls: ["./categories.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {
	readonly categoriesPage = CATEGORIES_PAGE;
	categories$ = this._categoriesPageService.categoriesQuery.valueChanges.pipe(
		map((result) => result.data.categories.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _categoriesPageService: CategoriesPageService,
		private readonly _routerService: RouterService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb({
			routerLink: CLIENT_ROUTES.CREATE_ORDER.absolutePath.replace(
				PLACE_ID,
				this._routerService.getParams(PLACE_ID.slice(1))
			)
		});
	}

	ngOnDestroy() {
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
