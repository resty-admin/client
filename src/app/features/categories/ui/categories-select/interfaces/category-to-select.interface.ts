import type { CategoryEntity } from "@graphql";

export interface ICategoryToSelect {
	id: CategoryEntity["id"];
	name: CategoryEntity["name"];
}
