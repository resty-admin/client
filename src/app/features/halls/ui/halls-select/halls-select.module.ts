import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ImageModule } from "../../../../shared/ui/image";
import { HallsSelectComponent } from "./layout/halls-select.component";

@NgModule({
	declarations: [HallsSelectComponent],
	imports: [CommonModule, ImageModule, ReactiveFormsModule],
	exports: [HallsSelectComponent]
})
export class HallsSelectModule {}
