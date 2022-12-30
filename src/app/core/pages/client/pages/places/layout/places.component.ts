import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PlacesService } from "src/app/features/places";
import { BreadcrumbsService } from "src/app/shared/modules/breadcrumbs";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	readonly places$ = this._placesService.places$;

	constructor(
		private readonly _placesService: PlacesService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(null);
	}
}
