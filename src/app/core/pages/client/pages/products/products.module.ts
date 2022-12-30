import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ButtonModule } from "../../../../../shared/ui/button";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	declarations: [ProductsComponent],
	imports: [CommonModule, ProductsRoutingModule, TypographyModule, ImageModule, ButtonModule]
})
export class ProductsModule {}
