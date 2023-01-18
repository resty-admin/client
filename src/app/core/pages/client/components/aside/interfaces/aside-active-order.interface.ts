import type { ActiveOrderEntity } from "../../../../../../../graphql";

export interface IAsideActiveOrder {
	id: ActiveOrderEntity["id"];
	type: ActiveOrderEntity["type"];
	code: ActiveOrderEntity["code"];
}
