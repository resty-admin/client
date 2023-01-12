import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../shared/modules/i18n";
import { CodeInputModule } from "../../../../../shared/ui/code-input";
import { ConnectToOrderRoutingModule } from "./connect-to-order-routing.module";
import { ConnectToOrderComponent } from "./layout/connect-to-order.component";
import { CONNECT_TO_ORDER_PROVIDERS } from "./providers";

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
	providers: CONNECT_TO_ORDER_PROVIDERS
})
export class ConnectToOrderModule {}
