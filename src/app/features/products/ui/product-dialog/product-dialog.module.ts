import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { TranslocoModule } from "../../../../shared/modules/i18n";
import { ButtonModule } from "../../../../shared/ui/button";
import { IconModule } from "../../../../shared/ui/icon";
import { ImageModule } from "../../../../shared/ui/image";
import { RadioButtonModule } from "../../../../shared/ui/radio-button";
import { TextareaModule } from "../../../../shared/ui/textarea";
import { ProductDialogComponent } from "./layout/product-dialog.component";
import { PRODUCT_DIALOG_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductDialogComponent],
	imports: [
		CommonModule,
		ImageModule,
		IconModule,
		TranslocoModule,
		RadioButtonModule,
		TextareaModule,
		ButtonModule,
		ReactiveFormsModule
	],
	providers: PRODUCT_DIALOG_PROVIDERS,
	exports: [ProductDialogComponent]
})
export class ProductDialogModule {}
