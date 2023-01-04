import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../shared/modules/i18n";
import { CodeRoutingModule } from "./code-routing.module";
import { CodeComponent } from "./layout/code.component";

@NgModule({
	declarations: [CodeComponent],
	imports: [
		CommonModule,
		CodeRoutingModule,
		InputModule,
		TypographyModule,
		IconModule,
		ImageModule,
		ReactiveFormsModule,
		I18nModule
	],
	exports: [CodeComponent]
})
export class CodeModule {}
