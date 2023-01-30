import { Injectable } from "@angular/core";

import { PaymentStatusPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentStatusPageService {
	readonly paymentStatusPageQuery = this._paymentStatusPageGQL.watch();

	constructor(private readonly _paymentStatusPageGQL: PaymentStatusPageGQL) {}
}
