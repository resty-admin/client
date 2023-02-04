import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";

import { PreviewPlaceComponent } from "./layout/preview-place.component";

@NgModule({
	declarations: [PreviewPlaceComponent],
	imports: [CommonModule, ImageModule, IconModule, I18nModule],
	exports: [PreviewPlaceComponent]
})
export class PreviewPlaceModule {}
