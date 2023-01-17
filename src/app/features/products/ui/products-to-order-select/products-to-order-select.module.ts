import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { ProductToOrderModule } from "../product-to-order";
import { ProductsToOrderSelectComponent } from "./layout/products-to-order-select.component";

@NgModule({
	declarations: [ProductsToOrderSelectComponent],
	imports: [CommonModule, ReactiveFormsModule, ProductToOrderModule],
	exports: [ProductsToOrderSelectComponent]
})
export class ProductsToOrderSelectModule {}
