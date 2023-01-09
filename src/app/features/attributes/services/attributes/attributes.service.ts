import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { AttributesGQL } from "../../graphql/attributes";

@Injectable({ providedIn: "root" })
export class AttributesService {
	private readonly _attributesQuery = this._attributesGQL.watch({ skip: 0, take: 5 });
	readonly attributes$ = this._attributesQuery.valueChanges.pipe(map((result) => result.data.attributes.data));

	constructor(private readonly _attributesGQL: AttributesGQL) {}
}
