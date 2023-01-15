import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

import { PLACES_PAGE_I18N } from "../constants";
import { PlacesPageGQL } from "../graphql/places-pages";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	readonly placesPageI18n = PLACES_PAGE_I18N;
	private readonly _placesPageQuery = this._placesPageGQL.watch();
	readonly places$ = this._placesPageQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(
		private readonly _placesPageGQL: PlacesPageGQL,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	trackByFn(index: number) {
		return index;
	}

	ngOnInit() {
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
