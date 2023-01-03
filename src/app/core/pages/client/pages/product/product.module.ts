import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { CounterModule } from "src/app/shared/ui/counter";
import { ImageModule } from "src/app/shared/ui/image";
import { MultipleCheckboxModule } from "src/app/shared/ui/multiple-checkbox";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { TextareaModule } from "src/app/shared/ui/textarea";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductComponent } from "./layout/product.component";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
	declarations: [ProductComponent],
	exports: [ProductComponent],
	imports: [
		CommonModule,
		ProductRoutingModule,
		ReactiveFormsModule,
		ImageModule,
		TypographyModule,
		ButtonModule,
		TextareaModule,
		RadioButtonModule,
		CounterModule,
		MultipleCheckboxModule
	]
})
export class ProductModule {}
