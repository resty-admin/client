import { ClipboardModule } from "@angular/cdk/clipboard";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { REFERRAL_LINK_PAGE_I18N } from "./constants";
import { ReferralLinkComponent } from "./layout/referral-link.component";
import { ReferralLinkRoutingModule } from "./referral-link-routing.module";

@NgModule({
	declarations: [ReferralLinkComponent],
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
	providers: [getI18nProvider(REFERRAL_LINK_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class ReferralLinkModule {}
