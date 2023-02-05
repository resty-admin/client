import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CounterModule } from "@shared/ui/counter";
import { ImageModule } from "@shared/ui/image";
import { RadioButtonModule } from "@shared/ui/radio-button";

import { ProductDialogComponent } from "./layout/product-dialog.component";

@NgModule({
	declarations: [ProductDialogComponent],
	imports: [CommonModule, ImageModule, CounterModule, I18nModule, RadioButtonModule, ReactiveFormsModule, ButtonModule],
	exports: [ProductDialogComponent]
})
export class ProductDialogModule {}
