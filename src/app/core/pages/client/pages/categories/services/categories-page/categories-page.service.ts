import { Injectable } from "@angular/core";

import { CategoriesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CategoriesPageService {
	readonly categoriesQuery = this._categoriesPageGQL.watch();

	constructor(private readonly _categoriesPageGQL: CategoriesPageGQL) {}
}
