import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

import type { IFactory } from "../../interfaces";
import { DirectivesModule } from "../../modules/directives";
import { IMAGE_COMPONENTS } from "./components";
import { IMAGE_DIRECTIVES } from "./directives";
import { IMAGE_CONFIG } from "./injection-tokens";
import type { IImageConfig } from "./interfaces";
import { ImageComponent } from "./layout/image.component";

@NgModule({
	declarations: [ImageComponent, ...IMAGE_DIRECTIVES, ...IMAGE_COMPONENTS],
	imports: [CommonModule, DirectivesModule],
	exports: [ImageComponent, ...IMAGE_DIRECTIVES]
})
export class ImageModule {
	static forRoot(imageConfigFactory: IFactory<IImageConfig>): ModuleWithProviders<ImageModule> {
		return {
			ngModule: ImageModule,
			providers: [
				{
					provide: IMAGE_CONFIG,
					...imageConfigFactory
				}
			]
		};
	}
}
