import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "@shared/modules/pipes";
import { ButtonModule } from "@shared/ui/button";
import { InputModule } from "@shared/ui/input";

import { IosDatepickerComponent } from "./layout/ios-datepicker.component";

@NgModule({
	declarations: [IosDatepickerComponent],
	imports: [CommonModule, ReactiveFormsModule, PipesModule, InputModule, ButtonModule],
	exports: [IosDatepickerComponent]
})
export class IosDatepickerModule {}
