import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterRepository } from "@ngneat/elf-ng-router-store";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { take } from "rxjs";
import { DYNAMIC_TOKEN } from "src/app/shared/constants";
import type { IVerifyCode } from "src/app/shared/interfaces";
import { CLIENT_ROUTES } from "src/app/shared/routes";

import { AuthService } from "../../../services";

@UntilDestroy()
@Component({
	selector: "app-verification-code",
	templateUrl: "./verification-code.component.html",
	styleUrls: ["./verification-code.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent implements OnInit {
	readonly form = this._formBuilder.group<IVerifyCode>({
		verificationCode: 0
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _router: Router,
		private readonly _routerRepository: RouterRepository
	) {}

	ngOnInit() {
		this._routerRepository
			.selectParams(DYNAMIC_TOKEN)
			.pipe(untilDestroyed(this))
			.subscribe((accessToken) => {
				this._authService.updateAccessToken(accessToken);
			});
	}

	verifyCode(formValue: IVerifyCode) {
		this._authService
			.verifyCode(formValue)
			.pipe(take(1))
			.subscribe(async () => {
				await this._router.navigateByUrl(CLIENT_ROUTES.CLIENT.absolutePath);
			});
	}
}
