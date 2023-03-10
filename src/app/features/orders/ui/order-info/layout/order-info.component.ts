import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { OrderStatusEnum, OrderTypeEnum } from "@graphql";
import { CLIENT_ROUTES, DAYJS_DISPLAY_FORMAT, HALL_ID, PLACE_ID, TABLE_ID } from "@shared/constants";
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
	@Output() dateClicked = new EventEmitter<IOrderInfo>();
	@Input() order?: IOrderInfo | null;

	status = "";
	tableInfo = "";
	tableLink = "";
	dateInfo = "";

	validationStatus?: "INVALID" | "LOADING" | "VALID";

	ngOnChanges(changes: ISimpleChanges<OrderInfoComponent>) {
		if (!changes.order || !changes.order.currentValue) {
			return;
		}

		const { table, startDate, status, type, place } = changes.order.currentValue;

		const dateStatuses = [OrderTypeEnum.Pickup, OrderTypeEnum.Reserve, OrderTypeEnum.Delivery];
		const tableStauses = new Set([OrderTypeEnum.Reserve, OrderTypeEnum.InPlace]);

		const tableName = table ? `${table.hall.name}, ${table.name}` : "";
		const dateName = startDate ? dayjs(startDate).format(DAYJS_DISPLAY_FORMAT) : "";

		this.tableInfo = tableStauses.has(type) ? tableName || "Выберите стол" : "";
		this.dateInfo = dateStatuses.includes(type) ? dateName || "Выберите время" : "";
		this.status = type !== OrderTypeEnum.InPlace && status !== OrderStatusEnum.Created ? status : "";

		this.tableLink = table
			? CLIENT_ROUTES.TABLE.absolutePath
					.replace(PLACE_ID, place.id)
					.replace(HALL_ID, table?.hall.id)
					.replace(TABLE_ID, table.id)
			: CLIENT_ROUTES.HALLS.absolutePath.replace(PLACE_ID, place.id);
	}

	emitDateClicked(order?: IOrderInfo | null) {
		if (!order) {
			return;
		}

		this.dateClicked.emit(order);
	}
}
