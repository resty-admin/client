import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM_I18N } from "@core/constants";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES } from "@shared/constants";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { lastValueFrom } from "rxjs";

import { PROFILE_PAGE_I18N } from "../constants";
import type { IProfileForm } from "../interfaces";

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

	readonly formGroup = this._formBuilder.group<IProfileForm>({
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

		this._breadcrumbsService.setBreadcrumb({ routerLink: CLIENT_ROUTES.PLACES.absolutePath });
		this._actionsService.setAction({
			label: "Подтвердить",
			func: async () => {
				await lastValueFrom(this._authService.updateMe(this.formGroup.value));

				await this._authService.getMeQuery.refetch();
			}
		});
	}

	async deleteMe() {
		await lastValueFrom(this._authService.deleteMe());
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
