import type { ActiveOrderEntity } from "@graphql";

export interface ICloseConfirmationInput {
	code: ActiveOrderEntity["code"];
	id: ActiveOrderEntity["id"];
	type: ActiveOrderEntity["type"];
}
