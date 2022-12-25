import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	declarations: [ProductsComponent],
	imports: [CommonModule, ProductsRoutingModule, TypographyModule, ImageModule],
	exports: [ProductsComponent]
})
export class ProductsModule {}
