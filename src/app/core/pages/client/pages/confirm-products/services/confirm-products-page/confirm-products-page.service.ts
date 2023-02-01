import { Injectable } from "@angular/core";

import { ConfirmProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ConfirmProductsPageService {
	readonly confirmProductsPageQuery = this._confirmProductsPageGQL.watch();

	constructor(private readonly _confirmProductsPageGQL: ConfirmProductsPageGQL) {}
}
