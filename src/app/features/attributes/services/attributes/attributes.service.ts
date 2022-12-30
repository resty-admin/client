import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { AttributesGQL } from "../../graphql/attributes";

@Injectable({ providedIn: "root" })
export class AttributesService {
	readonly attributes$ = this._attributesGQL
		.watch({ skip: 0, take: 5 })
		.valueChanges.pipe(map((result) => result.data.attributes.data));

	constructor(private readonly _attributesGQL: AttributesGQL) {}

	async refetch() {
		await this._attributesGQL.watch().refetch();
	}
}
