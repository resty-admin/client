import type { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";

@Pipe({ name: "attributes" })
export class AttributesPipe implements PipeTransform {
	transform() {
		return "";
	}
}
