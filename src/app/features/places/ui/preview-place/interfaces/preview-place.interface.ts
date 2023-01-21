import type { PlaceEntity } from "@graphql";

export interface IPreviewPlace {
	file?: PlaceEntity["file"];
	name: PlaceEntity["name"];
	status: PlaceEntity["status"];
	address?: PlaceEntity["address"];
}
