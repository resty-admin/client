import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { DirectivesModule } from "../../../../../shared/modules/directives";
import { ButtonModule } from "../../../../../shared/ui/button";
import { CounterModule } from "../../../../../shared/ui/counter";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	declarations: [ProductsComponent],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		TypographyModule,
		ImageModule,
		ButtonModule,
		CounterModule,
		DirectivesModule
	]
})
export class ProductsModule {}
