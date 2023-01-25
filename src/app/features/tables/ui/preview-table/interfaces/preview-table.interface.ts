import type { TableEntity } from "@graphql";

export interface IPreviewTable {
	file?: TableEntity["file"];
	name: TableEntity["name"];

	active?: boolean;
}
