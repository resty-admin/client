import type { PlaceEntity } from "@graphql";

export interface IPreviewPlace {
	file?: PlaceEntity["file"];
	name: PlaceEntity["name"];
	weekDays?: PlaceEntity["weekDays"];
	status: PlaceEntity["status"];
	address?: PlaceEntity["address"];
}
