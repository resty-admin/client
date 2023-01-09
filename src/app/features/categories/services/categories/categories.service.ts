import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CategoriesGQL } from "../../graphql/categories";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	private readonly _categoriesQuery = this._categoriesGQL.watch({ skip: 0, take: 10 });

	readonly categories$ = this._categoriesQuery.valueChanges.pipe(map((result) => result.data.categories.data));

	constructor(private readonly _categoriesGQL: CategoriesGQL) {}
}
