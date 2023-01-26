import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { CategoriesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CategoriesResolver implements Resolve<any> {
	constructor(private _categoriesPageGQL: CategoriesPageGQL) {}

	resolve(): Observable<any> {
		return this._categoriesPageGQL.watch().valueChanges.pipe(map((result) => result.data.categories.data));
	}
}
