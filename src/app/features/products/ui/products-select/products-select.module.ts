import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { PreviewProductModule } from "../preview-product";
import { ProductsSelectComponent } from "./layout/products-select.component";

@NgModule({
	declarations: [ProductsSelectComponent],
	imports: [CommonModule, ReactiveFormsModule, PreviewProductModule],
	exports: [ProductsSelectComponent]
})
export class ProductsSelectModule {}
