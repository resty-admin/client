import { NgModule } from "@angular/core";
import type { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { JwtGuard } from "@features/auth";
import { CLIENT_ROUTES } from "@shared/constants";

import { AUTH_PAGE } from "./constants";
import { AuthComponent } from "./layout/auth.component";

export const AUTH_ROUTES: Routes = [
	{
		path: "",
		component: AuthComponent,
		data: {
			animation: AUTH_PAGE
		},
		children: [
			{
				...CLIENT_ROUTES.SIGN_IN,
				loadChildren: () => import("./pages/sign-in/sign-in.module").then((m) => m.SignInModule)
			},
			{
				...CLIENT_ROUTES.SIGN_UP,
				loadChildren: () => import("./pages/sign-up/sign-up.module").then((m) => m.SignUpModule)
			},
			{
				...CLIENT_ROUTES.FORGOT_PASSWORD,
				loadChildren: () => import("./pages/forgot-password/forgot-password.module").then((m) => m.ForgotPasswordModule)
			},
			{
				...CLIENT_ROUTES.RESET_PASSWORD,
				loadChildren: () => import("./pages/reset-password/reset-password.module").then((m) => m.ResetPasswordModule),
				canActivate: [JwtGuard]
			},
			{
				...CLIENT_ROUTES.VERIFICATION_CODE,
				loadChildren: () =>
					import("./pages/verification-code/verification-code.module").then((m) => m.VerificationCodeModule),
				canActivate: [JwtGuard]
			},
			{
				...CLIENT_ROUTES.GOOGLE,
				loadChildren: () => import("./pages/google/google.module").then((m) => m.GoogleModule)
			},
			{
				...CLIENT_ROUTES.TELEGRAM,
				loadChildren: () => import("./pages/telegram/telegram.module").then((m) => m.TelegramModule)
			},
			{
				path: "**",
				redirectTo: CLIENT_ROUTES.SIGN_IN.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(AUTH_ROUTES)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
