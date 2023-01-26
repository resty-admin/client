import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderModule } from "../active-order";
import { AlreadyExistComponent } from "./layout/already-exist.component";
import { ALREADY_EXIST_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AlreadyExistComponent],
	imports: [CommonModule, I18nModule, TypographyModule, ButtonModule, ActiveOrderModule],
	providers: ALREADY_EXIST_PROVIDERS,
	exports: [AlreadyExistComponent]
})
export class AlreadyExistModule {}
