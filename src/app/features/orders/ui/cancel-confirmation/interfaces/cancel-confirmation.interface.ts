import type { ActiveOrderEntity } from "@graphql";

export interface ICancelConfirmationInput {
	code: ActiveOrderEntity["code"];
	id: ActiveOrderEntity["id"];
	type: ActiveOrderEntity["type"];
}
