import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import { take } from "rxjs";
import { DYNAMIC_TOKEN } from "src/app/shared/constants";
import { CLIENT_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { AuthService } from "../../../../../../features/auth/services";
import { VERIFICATION_CODE_PAGE_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-verification-code",
	templateUrl: "./verification-code.component.html",
	styleUrls: ["./verification-code.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent implements OnInit {
	readonly verificationCodePageI18n = VERIFICATION_CODE_PAGE_I18N;
	readonly form = this._formBuilder.group<any>({
		verificationCode: 0
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		const dynamicToken = this._routerService.getParams(DYNAMIC_TOKEN.slice(1));

		await this._authService.updateAccessToken(dynamicToken);
	}

	verifyCode({ verificationCode }: any) {
		this._authService
			.verifyCode(verificationCode)
			.pipe(take(1))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
			});
	}
}
