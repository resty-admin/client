import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { TypographyModule } from "@shared/ui/typography";

import { ActiveOrderModule } from "../active-order";
import { CancelConfirmationComponent } from "./layout/cancel-confirmation.component";

@NgModule({
	declarations: [CancelConfirmationComponent],
	imports: [CommonModule, I18nModule, TypographyModule, ButtonModule, ActiveOrderModule],
	exports: [CancelConfirmationComponent]
})
export class CancelConfirmationModule {}
