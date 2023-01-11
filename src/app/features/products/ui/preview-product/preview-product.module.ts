import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CounterModule } from "../../../../shared/ui/counter";
import { ImageModule } from "../../../../shared/ui/image";
import { PreviewProductComponent } from "./layout/preview-product.component";

@NgModule({
	declarations: [PreviewProductComponent],
	imports: [CommonModule, ImageModule, CounterModule],
	exports: [PreviewProductComponent]
})
export class PreviewProductModule {}
