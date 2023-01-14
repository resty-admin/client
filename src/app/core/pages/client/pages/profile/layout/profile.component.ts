import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

import { ActionsService } from "../../../../../../features/app";
import { AuthService } from "../../../../../../features/auth/services";
import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { BreadcrumbsService } from "../../../../../../shared/modules/breadcrumbs";
import { FORM_I18N } from "../../../../../constants";
import { PROFILE_PAGE_I18N } from "../constants";

@UntilDestroy()
@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
	readonly formI18n = FORM_I18N;
	readonly profilePageI18n = PROFILE_PAGE_I18N;
	readonly user$ = this._authService.me$;

	readonly formGroup = this._formBuilder.group<any>({
		name: "",
		tel: "",
		email: ""
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService
	) {}

	ngOnInit() {
		this.user$.pipe(untilDestroyed(this)).subscribe((user) => {
			if (!user) {
				return;
			}

			this.formGroup.patchValue(user);
		});

		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.PLACES.absolutePath);
		this._actionsService.setAction({
			label: "Подтвердить",
			action: () => {
				this._authService.updateMe(this.formGroup.value).subscribe();
			}
		});
	}

	deleteMe() {
		this._authService.deleteMe().subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBackUrl(null);
	}
}
