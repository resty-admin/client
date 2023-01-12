import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { DialogModule } from "src/app/shared/ui/dialog";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { TranslocoModule } from "../../../../../shared/modules/i18n";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./layout/dashboard.component";
import { DASHBOARD_PROVIDERS } from "./providers";

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		TypographyModule,
		ImageModule,
		ButtonModule,
		IconModule,
		DialogModule,
		TranslocoModule
	],
	providers: DASHBOARD_PROVIDERS
})
export class DashboardModule {}
