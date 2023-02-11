import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({ name: "price" })
export class PricePipe implements PipeTransform {
	transform(price?: number | null) {
		if (!price) {
			return price;
		}

		return (price / 100).toFixed(2);
	}
}
