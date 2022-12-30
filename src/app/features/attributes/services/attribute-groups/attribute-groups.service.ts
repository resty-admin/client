import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { AttributeGroupsGQL } from "../../graphql/attribute-groups";

@Injectable({ providedIn: "root" })
export class AttributeGroupsService {
	readonly attributeGroups$ = this._attributeGroupsGQL
		.watch()
		.valueChanges.pipe(map((result) => result.data.attributeGroups.data));

	constructor(private readonly _attributeGroupsGQL: AttributeGroupsGQL) {}

	async refetch() {
		await this._attributeGroupsGQL.watch().refetch();
	}
}
