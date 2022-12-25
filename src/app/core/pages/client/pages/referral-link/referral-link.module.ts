import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

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
		ButtonModule
	],
	exports: [ReferralLinkComponent]
})
export class ReferralLinkModule {}
