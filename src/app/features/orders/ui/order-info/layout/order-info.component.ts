import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ORDER_INFO_I18N } from "@features/orders/ui/order-info/constants";
import { OrderTypeEnum } from "@graphql";
import { CLIENT_ROUTES, HALL_ID, PLACE_ID, TABLE_ID } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import dayjs from "dayjs";

import type { IOrderInfo } from "../interfaces";

@Component({
	selector: "app-order-info",
	templateUrl: "./order-info.component.html",
	styleUrls: ["./order-info.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInfoComponent implements OnChanges {
	@Output() dateClicked = new EventEmitter<string>();
	@Input() order?: IOrderInfo | null;

	readonly orderInfoI18n = ORDER_INFO_I18N;

	tableStatus = "";
	tableInfo = "";
	tableLink = "";
	dateInfo = "";

	ngOnChanges(changes: ISimpleChanges<OrderInfoComponent>) {
		if (!changes.order || !changes.order.currentValue) {
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

		this.tableLink = table
			? CLIENT_ROUTES.TABLE.absolutePath
					.replace(PLACE_ID, place.id)
					.replace(HALL_ID, table?.hall.id)
					.replace(TABLE_ID, table.id)
			: CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, place.id);
	}

	emitDateClicked(dateInfo: string) {
		this.dateClicked.emit(dateInfo);
	}
}
