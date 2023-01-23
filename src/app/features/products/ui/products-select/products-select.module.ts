import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductModule } from "@features/products/ui/product";
import { SkeletonProductModule } from "@features/products/ui/skeleton-product";

import { ProductsSelectComponent } from "./layout/products-select.component";

@NgModule({
	declarations: [ProductsSelectComponent],
	imports: [CommonModule, ReactiveFormsModule, ProductModule, SkeletonProductModule],
	exports: [ProductsSelectComponent]
})
export class ProductsSelectModule {}
