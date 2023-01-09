import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { AttributeGroupsGQL } from "../../graphql/attribute-groups";

@Injectable({ providedIn: "root" })
export class AttributeGroupsService {
	private readonly _attributesGroupQuery = this._attributeGroupsGQL.watch();
	readonly attributeGroups$ = this._attributesGroupQuery.valueChanges.pipe(
		map((result) => result.data.attributeGroups.data)
	);

	constructor(private readonly _attributeGroupsGQL: AttributeGroupsGQL) {}
}
