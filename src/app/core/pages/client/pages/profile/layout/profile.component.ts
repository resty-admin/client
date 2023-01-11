import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { shareReplay } from "rxjs";

import { ActionsService } from "../../../../../../features/actions";
import { AuthService } from "../../../../../../features/auth/services";
import { CLIENT_ROUTES } from "../../../../../../shared/constants";
import { BreadcrumbsService } from "../../../../../../shared/modules/breadcrumbs";

@UntilDestroy()
@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
	readonly user$ = this._authService.getMe().pipe(shareReplay({ refCount: true }));

	readonly formGroup = this._formBuilder.group({
		name: "",
		tel: "",
		email: ""
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _breadcrumbsService: BreadcrumbsService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this._breadcrumbsService.setBackUrl(CLIENT_ROUTES.PLACES.absolutePath);

		this._actionsService.setAction({
			label: "Обновить",
			action: () => {
				this._authService.updateMe(this.formGroup.value).subscribe();
			}
		});

		this.user$.pipe(untilDestroyed(this)).subscribe((user: any) => {
			if (!user) {
				return;
			}

			this.formGroup.patchValue(user);
		});
	}

	deleteMe() {
		this._authService.deleteMe().subscribe();
	}
}
