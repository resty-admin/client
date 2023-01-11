import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ImageModule } from "../../../../shared/ui/image";
import { PreviewHallComponent } from "./layout/preview-hall.component";

@NgModule({
	declarations: [PreviewHallComponent],
	imports: [CommonModule, ImageModule],
	exports: [PreviewHallComponent]
})
export class PreviewHallModule {}
