import type { CategoryEntity } from "@graphql";

export interface IPreviewCategory {
	file: CategoryEntity["file"];
	name: CategoryEntity["name"];
}
