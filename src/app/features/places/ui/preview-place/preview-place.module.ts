import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconModule } from "../../../../shared/ui/icon";
import { ImageModule } from "../../../../shared/ui/image";
import { PreviewPlaceComponent } from "./layout/preview-place.component";

@NgModule({
	declarations: [PreviewPlaceComponent],
	imports: [CommonModule, ImageModule, IconModule],
	exports: [PreviewPlaceComponent]
})
export class PreviewPlaceModule {}
