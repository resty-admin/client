import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { CreateOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CreateOrderResolver implements Resolve<any> {
	constructor(private _createOrderPageGQL: CreateOrderPageGQL) {}

	resolve(): Observable<any> {
		return this._createOrderPageGQL.watch().valueChanges.pipe(map((result) => result.data.order));
	}
}
