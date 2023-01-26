import { ClipboardModule } from "@angular/cdk/clipboard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { TypographyModule } from "@shared/ui/typography";

import { REFERRAL_LINK_COMPONENTS } from "./components";
import { ReferralLinkComponent } from "./layout/referral-link.component";
import { REFERRAL_LINK_PROVIDERS } from "./providers";
import { ReferralLinkRoutingModule } from "./referral-link-routing.module";

@NgModule({
	declarations: [ReferralLinkComponent, ...REFERRAL_LINK_COMPONENTS],
	imports: [
		CommonModule,
		ReferralLinkRoutingModule,
		TypographyModule,
		InputModule,
		ImageModule,
		IconModule,
		ButtonModule,
		ClipboardModule,
		I18nModule
	],
	providers: REFERRAL_LINK_PROVIDERS
})
export class ReferralLinkModule {}
