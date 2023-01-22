import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CounterModule } from "@shared/ui/counter";
import { ImageModule } from "@shared/ui/image";

import { ProductComponent } from "./layout/product.component";

@NgModule({
	declarations: [ProductComponent],
	imports: [CommonModule, ImageModule, CounterModule],
	exports: [ProductComponent]
})
export class ProductModule {}
