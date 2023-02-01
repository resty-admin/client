import type { ActiveOrderEntity } from "@graphql";

export interface IAlreadyExistInput {
	code: ActiveOrderEntity["code"];
	id: ActiveOrderEntity["id"];

	type: ActiveOrderEntity["type"];
}
