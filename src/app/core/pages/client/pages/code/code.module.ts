import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CodeRoutingModule } from "./code-routing.module";
import { CodeComponent } from "./layout/code.component";

@NgModule({
	declarations: [CodeComponent],
	imports: [CommonModule, CodeRoutingModule, InputModule, TypographyModule, IconModule, ImageModule],
	exports: [CodeComponent]
})
export class CodeModule {}
