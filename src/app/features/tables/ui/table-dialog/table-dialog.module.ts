import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslocoModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { ImageModule } from "@shared/ui/image";
import { IosDatepickerModule } from "@shared/ui/ios-datepicker";

import { TableDialogComponent } from "./layout/table-dialog.component";
import { TABLE_DIALOG_PROVIDERS } from "./providers";

@NgModule({
	declarations: [TableDialogComponent],
	imports: [CommonModule, ImageModule, IosDatepickerModule, ButtonModule, TranslocoModule, ReactiveFormsModule],
	providers: TABLE_DIALOG_PROVIDERS,
	exports: [TableDialogComponent]
})
export class TableDialogModule {}
