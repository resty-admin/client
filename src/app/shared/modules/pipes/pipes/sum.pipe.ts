import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({ name: "sum" })
export class SumPipe implements PipeTransform {
	transform(sum?: number | null) {
		if (!sum) {
			return sum;
		}

		return (sum / 100).toFixed(2);
	}
}
