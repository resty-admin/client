import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { CodeInputModule } from "@shared/ui/code-input";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { TypographyModule } from "@shared/ui/typography";

import { ConnectToTableRoutingModule } from "./connect-to-table-routing.module";
import { ConnectToTableComponent } from "./layout/connect-to-table.component";
import { CONNECT_TO_TABLE_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ConnectToTableComponent],
	imports: [
		CommonModule,
		ConnectToTableRoutingModule,
		InputModule,
		TypographyModule,
		IconModule,
		ImageModule,
		ReactiveFormsModule,
		I18nModule,
		CodeInputModule
	],
	providers: CONNECT_TO_TABLE_PROVIDERS
})
export class ConnectToTableModule {}
