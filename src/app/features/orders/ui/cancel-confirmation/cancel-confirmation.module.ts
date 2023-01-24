import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { TypographyModule } from "@shared/ui/typography";

import { CancelConfirmationComponent } from "./layout/cancel-confirmation.component";
import { CANCEL_CONFIRMATION_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CancelConfirmationComponent],
	imports: [CommonModule, RouterModule, I18nModule, TypographyModule, ButtonModule],
	providers: CANCEL_CONFIRMATION_PROVIDERS,
	exports: [CancelConfirmationComponent]
})
export class CancelConfirmationModule {}
