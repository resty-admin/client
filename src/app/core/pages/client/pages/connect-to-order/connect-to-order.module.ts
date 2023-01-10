import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { CodeInputModule } from "../../../../../shared/ui/code-input";
import { ConnectToOrderRoutingModule } from "./connect-to-order-routing.module";
import { ConnectToOrderComponent } from "./layout/connect-to-order.component";

@NgModule({
	declarations: [ConnectToOrderComponent],
	imports: [
		CommonModule,
		ConnectToOrderRoutingModule,
		InputModule,
		TypographyModule,
		IconModule,
		ImageModule,
		ReactiveFormsModule,
		I18nModule,
		CodeInputModule
	],
	providers: [getI18nProvider("connectToOrderPage", (lang) => import(`./i18n/${lang}.json`))]
})
export class ConnectToOrderModule {}
