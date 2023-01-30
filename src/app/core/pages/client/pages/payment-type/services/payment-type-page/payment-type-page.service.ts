import { Injectable } from "@angular/core";

import { PaymentTypePageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentTypePageService {
	readonly paymentTypePageQuery = this._paymentTypePageGQL.watch();

	constructor(private readonly _paymentTypePageGQL: PaymentTypePageGQL) {}
}
