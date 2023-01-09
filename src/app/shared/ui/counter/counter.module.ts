import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DirectivesModule } from "../../modules/directives";
import { IconModule } from "../icon";
import { CounterComponent } from "./layout/counter.component";

@NgModule({
	declarations: [CounterComponent],
	imports: [CommonModule, IconModule, DirectivesModule],
	exports: [CounterComponent]
})
export class CounterModule {}
