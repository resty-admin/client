import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderModule } from "../active-order";
import { CloseConfirmationComponent } from "./layout/close-confirmation.component";

@NgModule({
	declarations: [CloseConfirmationComponent],
	imports: [CommonModule, I18nModule, TypographyModule, ButtonModule, ActiveOrderModule],
	exports: [CloseConfirmationComponent]
})
export class CloseConfirmationModule {}
