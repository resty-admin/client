import type { ActiveOrderEntity, HallEntity, PlaceEntity, TableEntity } from "@graphql";

export interface IOrderInfo {
	type: ActiveOrderEntity["type"];
	place: {
		id: PlaceEntity["id"];
		name: PlaceEntity["name"];
	};
	table?: {
		id: TableEntity["id"];
		name: TableEntity["name"];
		hall: {
			id: HallEntity["id"];
			name: HallEntity["name"];
		};
	} | null;
	startDate: ActiveOrderEntity["startDate"];
	status: ActiveOrderEntity["status"];
}
