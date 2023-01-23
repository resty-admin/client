import type { ActiveOrderEntity, HallEntity, PlaceEntity, TableEntity } from "@graphql";

export interface IOrderPreview {
	code?: ActiveOrderEntity["code"];
	orderNumber?: ActiveOrderEntity["orderNumber"];
	totalPrice?: ActiveOrderEntity["totalPrice"];
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
}
