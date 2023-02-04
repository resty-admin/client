import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { CodeInputModule } from "@shared/ui/code-input";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { TypographyModule } from "@shared/ui/typography";

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
	]
})
export class ConnectToOrderModule {}
