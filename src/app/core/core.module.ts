import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { JwtModule } from "@auth0/angular-jwt";
import { ActiveOrderModule } from "@features/orders";
import { BasketModule } from "@features/orders/ui/basket";
import { ApiModule } from "@shared/modules/api";
import { ApolloModule } from "@shared/modules/apollo";
import { CookiesModule } from "@shared/modules/cookies";
import { CryptoModule } from "@shared/modules/crypto";
import { DirectivesModule } from "@shared/modules/directives";
import { ErrorsModule } from "@shared/modules/errors";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { SocketIoModule } from "@shared/modules/socket-io";
import { StoreModule } from "@shared/modules/store";
import { ThemeModule } from "@shared/modules/theme";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { CodeInputModule } from "@shared/ui/code-input";
import { DialogModule } from "@shared/ui/dialog";
import { FileModule } from "@shared/ui/file";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { LinkModule } from "@shared/ui/link";
import { NavigationSkeletonModule } from "@shared/ui/navigation-skeleton";
import { ProgressBarModule } from "@shared/ui/progress-bar";
import { SelectModule } from "@shared/ui/select";
import { ToastrModule } from "@shared/ui/toastr";
import { TooltipModule } from "@shared/ui/tooltip";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

import { CORE_COMPONENTS } from "./components";
import {
	API_CONFIG,
	APOLLO_CONFIG,
	BROWSER_MODULE_CONFIG,
	CODE_INPUT_CONFIG,
	CRYPTO_CONFIG,
	ERRORS_CONFIG,
	FILE_CONFIG,
	I18N_CONFIG,
	ICON_CONFIG,
	IMAGE_CONFIG,
	JWT_CONFIG,
	SELECT_CONFIG,
	SOCKET_IO_CONFIG,
	THEME_CONFIG,
	TOASTR_CONFIG
} from "./configs";
import { CoreRoutingModule } from "./core-routing.module";
import { CoreComponent } from "./layout/core.component";
import { CORE_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CoreComponent, ...CORE_COMPONENTS],
	imports: [
		BrowserModule.withServerTransition(BROWSER_MODULE_CONFIG),
		CoreRoutingModule,
		ProgressBarModule.forRoot(),
		StoreModule,
		SocketIoModule.forRoot(SOCKET_IO_CONFIG),
		FileModule.forRoot(FILE_CONFIG),
		ApolloModule.forRoot(APOLLO_CONFIG),
		ApiModule.forRoot(API_CONFIG),
		I18nModule.forRoot(I18N_CONFIG),
		ThemeModule.forRoot(THEME_CONFIG),
		IconModule.forRoot(ICON_CONFIG),
		ImageModule.forRoot(IMAGE_CONFIG),
		JwtModule.forRoot(JWT_CONFIG),
		CryptoModule.forRoot(CRYPTO_CONFIG),
		ToastrModule.forRoot(TOASTR_CONFIG),
		ErrorsModule.forRoot(ERRORS_CONFIG),
		NgxSkeletonLoaderModule.forRoot({ animation: "progress" }),
		DialogModule,
		SelectModule.forRoot(SELECT_CONFIG),
		TooltipModule.forRoot(),
		CodeInputModule.forRoot(CODE_INPUT_CONFIG),
		CookiesModule,
		NavigationSkeletonModule,
		PipesModule,
		DirectivesModule,
		ActiveOrderModule,
		LinkModule,
		ButtonModule,
		ActionsModule,
		BasketModule
	],
	providers: CORE_PROVIDERS,
	exports: [CoreComponent]
})
export class CoreModule {}
