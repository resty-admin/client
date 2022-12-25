import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ProductsErrorComponent } from "./layout/products-error.component";
import { ProductsErrorRoutingModule } from "./products-error-routing.module";

@NgModule({
	declarations: [ProductsErrorComponent],
	imports: [CommonModule, ProductsErrorRoutingModule, IconModule, TypographyModule, ButtonModule, ImageModule],
	exports: [ProductsErrorComponent]
})
export class ProductsErrorModule {}
