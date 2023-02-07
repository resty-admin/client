import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "@shared/ui/icon";

import { RadioButtonComponent } from "./layout/radio-button.component";

@NgModule({
	declarations: [RadioButtonComponent],
	imports: [CommonModule, ReactiveFormsModule, IconModule],
	exports: [RadioButtonComponent]
})
export class RadioButtonModule {}
