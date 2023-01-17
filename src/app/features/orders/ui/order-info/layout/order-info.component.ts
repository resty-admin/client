import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import dayjs from "dayjs";

import { OrderTypeEnum } from "../../../../../../graphql";
import { CLIENT_ROUTES, HALL_ID, PLACE_ID } from "../../../../../shared/constants";
import type { ISimpleChanges } from "../../../../../shared/interfaces";

@Component({
	selector: "app-order-info",
	templateUrl: "./order-info.component.html",
	styleUrls: ["./order-info.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInfoComponent implements OnChanges {
	@Input() order: any;

	tableStatus = "";
	tableInfo = "";
	tableLink = "";
	dateInfo = "";

	ngOnChanges(changes: ISimpleChanges<OrderInfoComponent>) {
		if (!changes.order) {
			return;
		}

		const { table, startDate, tableStatus, type, place } = changes.order.currentValue;

		const dateStatuses = [OrderTypeEnum.Pickup, OrderTypeEnum.Reserve, OrderTypeEnum.Delivery];
		const tableStauses = new Set([OrderTypeEnum.InPlace, OrderTypeEnum.Reserve]);

		const tableName = table ? `${table.hall.name}, ${table.name}` : "";
		const dateName = startDate ? dayjs(startDate).format("MM.DD.YYYY, HH:mm") : "";

		this.tableInfo = tableStauses.has(type) ? tableName || "Выберите стол" : "";
		this.dateInfo = dateStatuses.includes(type) ? dateName || "Выберите время" : "";
		this.tableStatus = tableStauses.has(type) ? tableStatus : "";

		this.tableLink = CLIENT_ROUTES.TABLES.absolutePath.replace(PLACE_ID, place.id).replace(HALL_ID, table?.hall.id);
	}
}
