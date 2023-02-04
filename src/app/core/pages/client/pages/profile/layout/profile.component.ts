import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import type { UserEntity } from "@graphql";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { CLIENT_ROUTES } from "@shared/constants";
import type { LanguagesEnum } from "@shared/enums";
import type { ThemeEnum } from "@shared/enums";
import { BreadcrumbsService } from "@shared/modules/breadcrumbs";
import { I18nService } from "@shared/modules/i18n";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { from, switchMap, take } from "rxjs";

export interface IProfileForm {
	name: UserEntity["name"];
	tel: UserEntity["tel"];
	email: UserEntity["email"];
}

@UntilDestroy()
@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
	readonly user$ = this._authService.me$;
	readonly formGroup = this._formBuilder.group<IProfileForm>({
		name: "",
		tel: "",
		email: ""
	});

	readonly language$ = this._authService.language$;
	readonly theme$ = this._authService.theme$;

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _dialogService: DialogService,
		private readonly _i18nService: I18nService
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
			label: "CONFIRM",
			func: () =>
				this._authService
					.updateMe(this.formGroup.value)
					.pipe(
						take(1),
						switchMap(() => from(this._authService.getMeQuery.refetch()))
					)
					.subscribe()
		});
	}

	changeLanguage(language: LanguagesEnum) {
		this._authService.updateLanguage(language);
	}

	changeTheme(theme: ThemeEnum) {
		this._authService.updateTheme(theme);
	}

	deleteMe() {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("USERS.CONFIRM"), value: {} }
			})
			.afterClosed$.pipe(switchMap(() => this._authService.deleteMe()))
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
		this._breadcrumbsService.setBreadcrumb(null);
	}
}
