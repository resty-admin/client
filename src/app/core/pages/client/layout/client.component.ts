import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { OrdersService } from "@features/orders";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { routerAnimation } from "@shared/animations";
import { PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";

@UntilDestroy()
@Component({
	selector: "app-client",
	templateUrl: "./client.component.html",
	styleUrls: ["./client.component.scss"],
	animations: [routerAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent implements OnInit {
	constructor(
		private readonly _childrenOutletContexts: ChildrenOutletContexts,
		private readonly _routerService: RouterService,
		private readonly _ordersService: OrdersService
	) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe((placeId) => {
				this._ordersService.setActivePlaceId(placeId);
			});
	}
}
