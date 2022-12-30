import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CategoriesGQL } from "../../graphql/categories";

@Injectable({ providedIn: "root" })
export class CategoriesService {
	readonly categories$ = this._categoriesGQL
		.watch({ skip: 0, take: 10 })
		.valueChanges.pipe(map((result) => result.data.categories.data));

	constructor(private readonly _categoriesGQL: CategoriesGQL) {}

	async refetch() {
		await this._categoriesGQL.watch().refetch();
	}
}
