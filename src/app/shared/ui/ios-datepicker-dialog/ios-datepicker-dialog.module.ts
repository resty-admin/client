import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "@shared/modules/pipes";
import { ButtonModule } from "@shared/ui/button";
import { InputModule } from "@shared/ui/input";

import { IosDatepickerModule } from "../ios-datepicker";
import { IosDatepickerDialogComponent } from "./layout/ios-datepicker-dialog.component";

@NgModule({
	declarations: [IosDatepickerDialogComponent],
	imports: [CommonModule, ReactiveFormsModule, PipesModule, InputModule, ButtonModule, IosDatepickerModule],
	exports: [IosDatepickerDialogComponent]
})
export class IosDatepickerDialogModule {}
